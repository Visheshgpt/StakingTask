"use client";

import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

import allConnections from "@/utils/connectors";
import { getName } from "@/utils/getConnectorName";

function Child() {
  const { connector, account, chainId, provider } = useWeb3React();
  console.log(`Priority Connector is: ${getName(connector)}`);
  console.log(`Connected Account is: ${account}`);
  console.log(`ActivechainId is: ${chainId}`);
  return null;
}

const connections = allConnections.map(([connector, hooks]) => [
  connector,
  hooks,
]);

export default function Web3Context({ children }) {
  return (
    <Web3ReactProvider connectors={connections}>
      <Child />
      {children}
    </Web3ReactProvider>
  );
}
