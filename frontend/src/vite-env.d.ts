/// <reference types="vite/client" />
// Extend the Window interface to include ethereum
import { MetaMaskInpageProvider } from "@metamask/providers";
// interface EthereumProvider {
//   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
//   on: (event: string, callback: (...args: unknown[]) => void) => void;
// }

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}
