import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

export const handleWalletConnect = (e) => {
  e.preventDefault();
  // Trigger WalletMultiButton functionality
  const button = document.querySelector(".wallet-adapter-button");
  if (button) {
    button.click();
  }

  // Add a small delay to ensure state updates properly
  setTimeout(() => {
    // After wallet connection, check if we need to refresh the page
    // to ensure the authentication state is properly updated
    const isConnected = document
      .querySelector(".wallet-adapter-button-trigger")
      ?.textContent?.includes("Connected");

    if (isConnected) {
      // If already on home page, refresh to update state
      if (window.location.pathname === "/") {
        window.location.reload();
      }
    }
  }, 1000);
};
