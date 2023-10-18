import useContract from "./useContracts";
import abi from "../ABI/erc20.json";
import { useWeb3React } from "@web3-react/core";
import { DEFAULT_CHAINID } from "@/config/constants";
import contracts from "@/config/contracts";

const useToken = () => {
  const { chainId = DEFAULT_CHAINID } = useWeb3React();

  return useContract(contracts.token[chainId], abi, chainId);
};

export default useToken;
