"use client";
import { useWMaticToken, useStake } from "@/hooks/useCalls";
import { useWeb3React } from "@web3-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const useGlobalData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { account, chainId } = useWeb3React();
  const { fetchBalance } = useWMaticToken();
  const { fetchStakeInfo, fetchStakeGlobalInfo, fetchStakeTvlInfo } =
    useStake();

  const [userData, setUserData] = useState(null);
  const [isUserDataLoaded, setisuserDataLoaded] = useState(false);

  const [globalData, setglobalData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && account && window && window.web3) {
      const fetchData = async () => {
        const [tokenBalance, stakeInfo] = await Promise.all([
          fetchBalance(),
          fetchStakeInfo(),
        ]);

        setUserData({
          tokenBalance,
          stakeInfo,
        });

        setisuserDataLoaded(true);
      };

      fetchData();

      // Set up an interval to fetch data every 10 seconds
      const intervalId = setInterval(fetchData, 10000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }

    if (!account) {
      setUserData(null);
    }
  }, [chainId, account]);

  useEffect(() => {
    const fetchData = async () => {
      const [globalInfo, tvlInfo] = await Promise.all([
        fetchStakeGlobalInfo(),
        fetchStakeTvlInfo(),
      ]);
      console.log("");

      setglobalData({
        globalInfo,
        tvlInfo,
      });

      setisuserDataLoaded(true);
    };

    fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [chainId, account]);

  return (
    <DataContext.Provider value={{ userData, globalData, isUserDataLoaded }}>
      {children}
    </DataContext.Provider>
  );
};
