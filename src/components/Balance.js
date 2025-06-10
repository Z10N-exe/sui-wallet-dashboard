import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const Balance = ({ account }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        const balance = await client.getBalance({ owner: account });
        setBalance(balance.totalBalance / 1e9); // Convert to SUI
        setLoading(false);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setLoading(false);
      }
    };
    fetchBalance();
  }, [account]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Balance</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h4">{balance ? `${balance} SUI` : 'Error'}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Balance;