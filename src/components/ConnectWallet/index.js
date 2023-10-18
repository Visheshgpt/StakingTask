"use client";

import React, { useEffect, useRef, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from "@/utils/helpers";

import MetaMaskOnboarding from "@metamask/onboarding";
import connectors from "@/utils/connectors";
import { DEFAULT_CHAINID } from "@/config/constants";

const injected = connectors[0][0];

const ConnectWallet = () => {
 
  const { connector, account, active, activate, chainId } = useWeb3React();
  const onboarding = useRef();

  const onConnectToMetamaskFunc = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      Promise.resolve(injected.activate(DEFAULT_CHAINID)).catch((e) => {
        injected.resetState();
        localStorage.removeItem("connectedWallet");
        console.debug("Failed to connect to metamask");
      });
      localStorage.setItem("connectedWallet", "metamask");
    } else {
      onboarding.current.startOnboarding();
    }
  };

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding?.current?.stopOnboarding();
      }
    }
  }, [account]);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  const logout = () => {
    if (connector?.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
    localStorage.removeItem("connectedWallet");
  };

  return (
    <div>
      {account ? (
        <button onClick={() => logout()} className="btn">
          {truncateAddress(account)}
        </button>
      ) : (
        <button onClick={() => onConnectToMetamaskFunc()} className="btn">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
