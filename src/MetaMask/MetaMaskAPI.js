import Web3 from "web3";

export default class MetaMaskAPI {
  static metaMaskExist = () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      console.error("MetaMask is not installed!");
      return false;
    } else return true;
  };

  static connect = async () => {
    if (!this.metaMaskExist()) return { success: false };
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (!accounts) {
      console.error("MetaMask connection request denied!");
      return { success: false };
    }
    console.log("connected");
    return { success: true, account: accounts[0] };
  };
}
