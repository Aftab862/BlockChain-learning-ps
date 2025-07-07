// hooks/useMetaMask.js
"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useMetaMask() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  return { account, connectWallet };
}
