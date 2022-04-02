import Web3 from "web3";
import PollStationInterface from "../artifacts/PollStation.json";

export default class PollAcess {
  CurrentWallet;
  //Poll Station Contract Instance
  PSC;
  PSCAdress;
  Web3;
  Provider;

  constructor(_provider, _contractAddress, _walletAddress) {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      this.Provider = _provider;
      this.PSCAdress = _contractAddress;
      this.CurrentWallet = _walletAddress;
      this.Web3 = new Web3(Web3.givenProvider || this.Provider);
      this.PSC = new this.Web3.eth.Contract(
        PollStationInterface.abi,
        this.PSCAdress
      );
    } else {
      console.error("web3 not found");
    }
  }

  #_parsePoll = (pollData) => {
    let { options, votes } = pollData;

    options = options.map((o) => {
      return { title: o, count: 0 };
    });

    votes.forEach((v) => {
      options[v.Opinion].count++;
    });

    options = options.map((o) => {
      if (o.count === 0) return { ...o, precent: 0 };
      const p = (o.count * 100) / votes.length;
      return { ...o, precent: p };
    });

    return { options, votes };
  };

  getAllPolls = async () => {
    const res = await this.PSC.methods.getPolls().call();
    return res.map((p, i) => {
      return {
        id: i,
        owner: p.Owner,
        title: p.Title,
        expireDate: new Date(p.ExpireDate * 1000),
        insertionDate: new Date(p.InsertionDate * 1000),
        votesCount: p.VotesCount,
        options: p.Options,
      };
    });
  };

  getPoll = async (pollId) => {
    const poll = await this.PSC.methods.getPoll(pollId).call();
    const pollVotes = await this.PSC.methods.getPollVotes(pollId).call();
    const { votes, options } = this.#_parsePoll({
      options: poll.Options,
      votes: pollVotes,
    });

    return {
      owner: poll.Owner,
      id: pollId,
      title: poll.Title,
      options: options,
      votesCount: poll.VotesCount,
      votes: pollVotes,
      expireDate: new Date(poll.ExpireDate * 1000),
      insertionDate: new Date(poll.InsertionDate * 1000),
    };
  };

  hasVoted = async (pollId) => {
    const res = await this.PSC.methods.hasVoted(pollId).call();
    console.log("CA PA", this.CurrentWallet, res);
    return res;
  };

  newPoll = async (newPoll) => {
    const { title, options } = newPoll;
    const pollRes = await this.PSC.methods
      .createPoll(title, options)
      .send({ from: this.CurrentWallet });
    if (!pollRes.status) {
      console.error("Failed to submit the poll", pollRes);
      return { pollId: -1 };
    }
    const poll = pollRes.events.NewPoll.returnValues;
    return { pollId: poll._pollId };
  };

  vote = async (pollId, opinion) => {
    const pollRes = await this.PSC.methods
      .vote(pollId, opinion)
      .send({ from: this.CurrentWallet });
    if (!pollRes.status) {
      console.error("Failed to submit the poll", pollRes);
      return { pollId: -1 };
    }
    const { _pollId, _option } = pollRes.events.NewVote.returnValues;
    console.log("vote  res", { _pollId, _option });
    return { _pollId, _option };
  };
}
