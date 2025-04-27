import React from "react";
import { useQuery } from "react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";
import { UserType } from "../../../backend/src/shared/types";
import { ethers } from "ethers";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

interface AppContext {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  user: UserType | null;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const AppContexts = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastMessage, setToastMessage] = React.useState<
    ToastMessage | undefined
  >(undefined);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [provider, setProvider] = React.useState<ethers.BrowserProvider | null>(
    null
  );

  // Fetch user data
  const { data: userData, isError } = useQuery<UserType | null>(
    "fetchUser",
    apiClient.fetchUser,
    {
      retry: false,
      onError: () =>
        setToastMessage({ message: "Failed to fetch user", type: "ERROR" }),
    }
  );

  // Default to null if userData is undefined
  const user = userData ?? null;

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setProvider(web3Provider);
        setToastMessage({
          message: `Wallet connected: ${address.slice(0, 6)}...${address.slice(
            -4
          )}`,
          type: "SUCCESS",
        });
      } catch (error) {
        setToastMessage({
          message: "Failed to connect wallet",
          type: "ERROR",
        });
      }
    } else {
      setToastMessage({
        message: "Please install MetaMask or another Web3 wallet",
        type: "ERROR",
      });
    }
  };

  // Disconnect Wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setProvider(null);
    setToastMessage({
      message: "Wallet disconnected",
      type: "SUCCESS",
    });
  };

  // Listen for wallet events
  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletAddress(accounts[0]);
        }
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [provider]);

  // Try auto-connecting wallet on mount
  React.useEffect(() => {
    const tryAutoConnect = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          const signer = await web3Provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          setProvider(web3Provider);
        }
      }
    };
    tryAutoConnect();
  }, []);

  return (
    <AppContexts.Provider
      value={{
        showToast: (toastMessage) => {
          setToastMessage(toastMessage);
        },
        isLoggedIn: !isError,
        user,
        walletAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(undefined)}
        />
      )}
      {children}
    </AppContexts.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContexts);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
