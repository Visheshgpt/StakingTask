import { useMemo } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { DEFAULT_RPC } from "@/config/constants";

const useContract = (address, ABI, contractChainId) => {
  const { connector, isActive, chainId, account } = useWeb3React();
 
  let _web3;
  if (
    typeof window !== "undefined" &&
    connector &&
    isActive &&
    account &&
    chainId === contractChainId
  ) {
    // Use window.web3 when the user is connected and has a valid Web3 instance
    _web3 = window.web3;
  } else {
    // Use a custom RPC Web3 instance
    _web3 = new Web3(new Web3.providers.HttpProvider(DEFAULT_RPC));
  }

  return useMemo(() => {
    if (!_web3 || !address || !ABI || !_web3.eth) {
      return null;
    }
    try {
      const contractInstance = new _web3.eth.Contract(ABI, address);
      return contractInstance;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, contractChainId]);
};

export default useContract;
