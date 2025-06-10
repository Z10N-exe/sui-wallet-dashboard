import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Alert, CircularProgress, Typography } from '@mui/material'; // Added Typography
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

const SendTokens = ({ account }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendTokens = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const client = new SuiClient({ url: getFullnodeUrl('testnet') });
      const txb = new TransactionBlock();
      const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount * 1e9)]);
      txb.transferObjects([coin], txb.pure(recipient));
      const result = await window.suiWallet.signAndExecuteTransactionBlock({ transactionBlock: txb });
      setSuccess(`Transaction successful: ${result.digest}`);
    } catch (err) {
      setError('Transaction failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Send Tokens</Typography>
        <TextField
          label="Recipient Address"
          fullWidth
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Amount (SUI)"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendTokens}
          disabled={loading || !recipient || !amount}
        >
          {loading ? <CircularProgress size={24} /> : 'Send'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </CardContent>
    </Card>
  );
};

export default SendTokens;