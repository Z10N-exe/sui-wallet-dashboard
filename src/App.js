import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, CssBaseline } from '@mui/material';
import WalletConnect from './components/WalletConnect';
import Balance from './components/Balance';
import SendTokens from './components/SendTokens';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Sui Wallet Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <WalletConnect setAccount={setAccount} />
          </Grid>
          {account && (
            <>
              <Grid item xs={12} md={6}>
                <Balance account={account} />
              </Grid>
              <Grid item xs={12} md={6}>
                <SendTokens account={account} />
              </Grid>
              <Grid item xs={12}>
                <TransactionHistory account={account} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;