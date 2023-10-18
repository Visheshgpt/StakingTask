import { networkSettings } from "./chains";

const DEFAULT_CHAINID = process.env.NEXT_PUBLIC_BSCT_CHAINID;

export const networkSwitcher = async (
  desiredChainId = DEFAULT_CHAINID,
  reloadRequired 
) => {
  const chainConfig = networkSettings[desiredChainId];

  const connectedWallet = localStorage.getItem("connectedWallet");
  if (connectedWallet === "metamask" || connectedWallet === "wallectConnect") {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainConfig.chainId }],
      })
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                rpcUrls: chainConfig.rpcUrls,
                chainId: chainConfig.chainId,
                nativeCurrency: {
                  name: chainConfig.nativeCurrency.name,
                  symbol: chainConfig.nativeCurrency.symbol,
                  decimals: chainConfig.nativeCurrency.decimals,
                },
                // blockExploreUrls: chainConfig.blockExplorerUrls,
                chainName: chainConfig.chainName,
              },
            ],
          });
          // window.location.reload();
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  }
};
