import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useStaking from "./useStaking";
import useToken from "./useToken";
import { UINT_MAX } from "@/config/constants";

export const useWMaticToken = () => {
  const tokenContract = useToken();
  const { account } = useWeb3React();

  const fetchBalance = useCallback(
    async (address = account) => {
      const balance = await tokenContract.methods.balanceOf(address).call();
      return balance;
    },
    [account, tokenContract]
  );

  const fetchAllowance = useCallback(
    async (spender, receiver) => {
      const allowance = await tokenContract.methods
        .allowance(spender, receiver)
        .call();
      return allowance;
    },
    [tokenContract]
  );

  const approve = useCallback(
    async (receiver, amount = UINT_MAX) => {
      const data = await tokenContract.methods.approve(
        receiver,
        amount.toFixed(0)
      );
      const transaction = await window.web3.eth.sendTransaction({
        from: account,
        to: tokenContract._address,
        data: data.encodeABI(),
      });
      return transaction;
    },
    [account, tokenContract]
  );

  return { fetchBalance, fetchAllowance, approve };
};

export const useStake = () => {
  const { account } = useWeb3React();
  const stakingContract = useStaking();
  const { fetchBalance, fetchAllowance, approve } = useWMaticToken();

  const fetchStakeInfo = useCallback(async () => {
    return await stakingContract.methods.getStakerInfo(account).call()
  }, [account, stakingContract])  

  const fetchStakeGlobalInfo = useCallback(async () => {
    return await stakingContract.methods.getDetails().call()
  }, [account, stakingContract])  

  const fetchStakeTvlInfo = useCallback(async () => {
    return await stakingContract.methods.getTVLDetails().call()
  }, [account, stakingContract])  

  const stake = useCallback(async () => {
    try {
      const [balance, allowance] = await Promise.all([
        fetchBalance(),
        fetchAllowance(account, stakingContract._address),
      ]);

      // check allowance
      const userBalance = new BigNumber(balance);
      if (userBalance.isGreaterThan(allowance)) {
        await approve(stakingContract._address);
      }

      const data = await stakingContract.methods.stake(
        userBalance.toFixed(0),
        "0x"
      );
      const transaction = await window.web3.eth.sendTransaction({
        from: account,
        to: stakingContract._address,
        data: data.encodeABI(),
      });
      console.log("transaction", transaction);
    } catch (error) {
      throw error;
    }
  }, [account, stakingContract]);

  const unstake = useCallback(async () => {
    try {
      const data = await stakingContract.methods.unstake();
      const transaction = await window.web3.eth.sendTransaction({
        from: account,
        to: stakingContract._address,
        data: data.encodeABI(),
      });
      console.log("transaction", transaction);
    } catch (error) {
      throw error;
    }
  }, [account, stakingContract]);

  const claimRewards = useCallback(async () => {
    try {
      const data = await stakingContract.methods.claimRewards();
      const transaction = await window.web3.eth.sendTransaction({
        from: account,
        to: stakingContract._address,
        data: data.encodeABI(),
      });
      console.log("transaction", transaction);
    } catch (error) {
      throw error;
    }
  }, [account, stakingContract]);

  return { fetchStakeInfo, fetchStakeGlobalInfo, fetchStakeTvlInfo, stake, unstake, claimRewards };
};
