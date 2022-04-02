import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../../../contexts/GlobalContext";
import { Colors } from "../../../Theme";
import Page from "../../commong/Page";
import PollOption from "./PollOption";

import moment from "moment";

const Container = styled.div`
  display: flex;
`;

const OptionsList = styled.div`
  margin-top: 1.5rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExpireDate = styled.span`
  font-size: 1rem;
  border: 2px solid ${Colors.Black};
  width: fit-content;
  padding: 0 0.5rem;
  border-radius: 30px;
`;

export default function Poll() {
  let { pollId } = useParams();
  const [Poll, setPoll] = useState({ options: [] });
  const [SelectedOption, setSelectedOption] = useState(-1);
  const { PollAccess, setIsLoading } = useContext(GlobalContext);
  const getPoll = async () => {
    setIsLoading(true);
    const res = await PollAccess.getPoll(pollId);
    setPoll(res);
    hasVoted(res);
    setIsLoading(false);
  };

  const hasVoted = (poll) => {
    poll.votes.forEach((v) => {
      if (v.Voter.toLowerCase() === PollAccess.CurrentWallet) {
        setSelectedOption(parseInt(v.Opinion));
      }
    });
  };

  useState(() => {
    if (pollId) getPoll();
    return () => {};
  }, [pollId]);

  return (
    <Page
      title={Poll.title}
      subTitle={`Submited by ${Poll.owner} ${moment().from(
        Poll.insertionDate
      )}`}
    >
      <ExpireDate>Expire Date: {moment().to(Poll.expireDate)}</ExpireDate>
      <Container>
        <OptionsList>
          {Poll?.options.map((o, i) => {
            const rndColor = Colors.random();
            o.pollId = pollId;
            o.optionId = i;
            o.selectedOption = SelectedOption;
            o.bgColor = rndColor;
            return <PollOption option={o} key={i} />;
          })}
        </OptionsList>
      </Container>
    </Page>
  );
}
