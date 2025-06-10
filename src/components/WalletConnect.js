import React from 'react';
import { Button, Alert } from '@mui/material';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const WalletConnect = ({ setAccount }) => {
  const connectWallet = async () => {
    if (!window.suiWallet) {
      alert('Sui Wallet extension not installed!');
      return;
    }
    try {
      const client = new SuiClient({ url: getFullnodeUrl('testnet') });
      const accounts = await window.suiWallet.requestPermissions();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect wallet');
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={connectWallet}>
      Connect Sui Wallet
    </Button>
  );
};

export default WalletConnect;