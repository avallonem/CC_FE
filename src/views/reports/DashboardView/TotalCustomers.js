import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Web3 from 'web3';
import { ERC20Basic } from 'src/abis.js';
import configData from 'src/config.json';
import keycloak from 'src/';
/*
const web3 = new Web3(Web3.givenProvider);
const contractAddr = configData.ERC20_CONTRACT;
const MyContract = new web3.eth.Contract(ERC20Basic, contractAddr);
*/
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));




const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const [balance,setBalance]=useState(0);
  const [amount, setAmount] = useState(0);
  const [orders, setItems] = useState([]);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


 useEffect(() => {
  (async () => {
  fetch(configData.BACKEND_URL + '/api/transactions?from_name=' + keycloak.idTokenParsed.family_name)
    .then(res => res.json())
    .then(
      (orders) => {
        setIsLoaded(true);
        setItems(orders);
      setBalance(orders.reduce( function(a, b){
        return a + parseInt(b.amount);
    }, 0));
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  })();
}, [])

if (error) {
  return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
  return <div>Loading...</div>;
} else {




  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL AMOUNT INVESTED
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {"ETH "+ balance}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountBalanceIcon />
            </Avatar>
          </Grid>
        </Grid>
  
      </CardContent>
    </Card>
  );
};

}

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
