import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

const metamask = initializeConnector((actions) => new MetaMask({ actions }));

// can add more prioviders
// i.e. walletconnect, coinbase

const connectors = [metamask];

export default connectors;
