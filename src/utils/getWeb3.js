import Web3 from "web3";

const getWeb3 = async (provider) => {
  let web3;
  const connectedWallet = localStorage.getItem("connectedWallet");

  if (connectedWallet === "metamask") {
    let mprovider = provider.provider;
    await mprovider.enable();
    web3 = new Web3(mprovider);
  }

  return web3;
};

export default getWeb3;
