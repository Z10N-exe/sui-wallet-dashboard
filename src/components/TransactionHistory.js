import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const TransactionHistory = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });
        const txs = await client.queryTransactionBlocks({
          filter: { FromAddress: account },
          limit: 5,
        });
        setTransactions(txs.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [account]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Transaction History</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Digest: ${tx.digest}`} secondary={`Timestamp: ${new Date(tx.timestampMs).toLocaleString()}`} />
                </ListItem>
              ))
            ) : (
              <Typography>No transactions found.</Typography>
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;