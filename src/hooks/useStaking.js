import useContract from "./useContracts";
import abi from "../ABI/staking.json";
import { useWeb3React } from "@web3-react/core";
import { DEFAULT_CHAINID } from "@/config/constants";
import contracts from "@/config/contracts";

const useStaking = () => {
  const { chainId = DEFAULT_CHAINID } = useWeb3React();

  return useContract(contracts.staking[chainId], abi, chainId);
};

export default useStaking;
