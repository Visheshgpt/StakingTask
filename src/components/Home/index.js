"use client";
import { useGlobalData } from "@/context/DataContext";
import { useStake } from "@/hooks/useCalls";
import { convertWeiToNumber } from "@/utils/helpers";
import React from "react";

const Home = () => {
  const { userData, globalData } = useGlobalData();
  const { tokenBalance, stakeInfo } = userData || {};
  const { stakedAmount, totalRewardsClaimed, unclaimedRewards } =
    stakeInfo || {};
  const { globalInfo, tvlInfo } = globalData || {};
  const { apy } = globalInfo || {};
  const { totalFundsStaked, totalFundsUnstaked, totalRewardsDistributed } =
    tvlInfo || {};

  const totalMaticStaked = convertWeiToNumber(totalFundsStaked);

  // we assume matic price $0.52
  // can be fetched latest price from api
  const totalMaticValue = totalMaticStaked.times(0.52);

  const { stake, unstake, claimRewards } = useStake();

  return (
    <main>
      <div className="stats-row">
        <div className="stats-item">
          <div className="stats-value">{Number(apy)}%</div>
          <div className="stats-label highlighted">% APY</div>
        </div>
        <div className="stats-item">
          <div className="stats-value">
            {convertWeiToNumber(totalFundsStaked).toFormat(0)} WMatic
          </div>
          <div className="stats-label">Total Matic staked</div>
        </div>
        <div className="stats-item">
          <div className="stats-value">${totalMaticValue.toFormat(2)}</div>
          <div className="stats-label">Staked Value</div>
        </div>
      </div>
      <div className="funds-and-claim">
        <div className="card">
          <div className="card-stats">
            <div className="matic-logo"></div>
            <div className="stats-value card-s">My funds</div>
            <div className="stats-label card-s">WMatic Staked</div>
            <div className="stats-value card-s">
              {convertWeiToNumber(stakedAmount).toFormat(0)} WMatic
            </div>
          </div>
          <div className="card-action">
            <a href="#">
              Available: {convertWeiToNumber(tokenBalance).toFixed(2)} WMatic
            </a>
            <button
              onClick={async () => {
                await stake();
              }}
              className="btn card-btn"
            >
              Stake
            </button>
            <button
              onClick={async () => {
                await unstake();
              }}
              className="btn card-btn inactive"
            >
              Unstake
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-stats">
            <div className="matic-logo"></div>
            <div className="stats-value card-s">My Rewards</div>
            <div className="stats-label card-s">Unclaimed Rewards</div>
            <div className="stats-value card-s">
              {convertWeiToNumber(unclaimedRewards).toFormat(4)} WMatic
            </div>
          </div>
          <div className="card-action">
            <a href="#">
              Total Rewards Claimed:{" "}
              {convertWeiToNumber(totalRewardsClaimed).toFormat(4)}
            </a>
            <button
              disabled={convertWeiToNumber(unclaimedRewards).isZero()}
              onClick={async () => {
                await claimRewards();
              }}
              className="btn card-btn"
            >
              Claim Rewards
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
