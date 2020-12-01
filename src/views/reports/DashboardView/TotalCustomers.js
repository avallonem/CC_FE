import React from 'react';
import { useState } from 'react';
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
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Web3 from 'web3';
import { ERC20Basic } from 'src/abis.js';
import configData from 'src/config.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddr = configData.ERC20_CONTRACT;
const MyContract = new web3.eth.Contract(ERC20Basic, contractAddr);

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
  const [balance,setBalance]=useState('0')
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    e.preventDefault();    
    console.info("entro nel metodo");
    const Web3 = require("web3");
  
    
    const web3 = new Web3(new Web3.providers.HttpProvider(configData.BLOCKCHAIN_URL))
    const accounts = await window.ethereum.enable();
    
    const gas = await MyContract.methods.balanceOf(account)
                        .estimateGas();
    const result = await MyContract.methods.balanceOf(account).send({
      from: account,
      gas 
    })
    const account= web3.eth.getAccounts[0];
    MyContract.methods.balanceOf(account, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.info("ETH "+web3.utils.fromWei(result, "ether") );
      setBalance("ETH "+ web3.utils.fromWei(result, "ether") );
      setIsLoaded(true);
    }
  })
}, [])
  
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
              {balance}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
  
      </CardContent>
    </Card>
  );
};



TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
