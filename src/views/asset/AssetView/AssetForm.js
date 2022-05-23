import React, { useState } from 'react';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from '@material-ui/core';
import Web3 from 'web3';
import { Escrow } from 'src/abis.js';
import keycloak from 'src/';
import configData from 'src/config.json';
let fs = require("fs");
const web3 = new Web3(Web3.givenProvider);
const contractAddr = configData.ESCROW_CONTRACT;
const MyContract = new web3.eth.Contract(Escrow, contractAddr);


const useStyles = makeStyles(({
  root: {}
}));

const AssetForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: '',
    description: 'Pension funds are financial intermediaries which offer social insurance by providing income to the insured persons following their retirement. Often they also provide death and disability benefits. Pension schemes are important cornerstones of European households’ income during retirement. Pension funds also play a role in financial markets as institutional investors. Pension funds typically aggregate large sums of money to be invested into the capital markets, such as stock and bond markets, to generate profit (returns). A pension fund represents an institutional investor and invests large pools of money into private and public companies. Pension funds are typically managed by companies (employers). The main goal of a pension fund is to ensure there will be enough money to cover the pensions of employees after their retirement in the future. Pension funds were created to provide employees with a supplementary pension, in addition to the pension paid by public social security institutions. State pensions usually operate through the principle of redistribution (workers social security contributions fund the pensions of already retired workers). Through pension funds, workers accrue a portion of the income they receive during their working life, according to the principle of capitalisation: regular payments by the subscribers contribute to a fund managed along financial lines, according to the clients’ risk tolerance. Clients can choose among various types of managed funds: shares, bonds or balanced funds. At the end of the agreement, typically a long-term contract, ideally lasting the full working life of the insured, a monthly annuity is paid. This varies according to the contributions made, the duration of the policy and the return on the investment. Pension funds can be open or closed (also known as negotiated funds). Open funds are available to any person in employment, while closed funds are reserved for specific professional categories, as the funds are established on the basis of agreements between trade unions and business organisations for specific industries. Further individual supplementary pension plans are available to anyone wishing to create a supplementary pension (including, for example, people not in employment or students). ',
    terms: 'You’ll open your Pension by completing the online application. When you do this we’ll set up an account for you and you’ll become a member of the scheme. The scheme provides pension accounts for many customers, of whom you are one. The money that you pay in builds up to create your pension pot. The Legal & General Personal Pension is suitable for eligible customers who want to save towards their retirement, and are happy to make their own investment decisions. You’ll have access to a range of investment options to meet your attitude to risk as well as online support. The scheme was established by a declaration of trust and is governed by a set of scheme rules which are required for it to be a registered pension scheme. The investments and money in the scheme are held by the trustee in the trustee’s name. Benefits under the scheme are payable by the trustee on our instruction. We’ll automatically claim basic rate tax relief from the government, based on the value of your payment, and we’ll add it to your Pension by no later than the end of business the following working day. If you pay one of the higher rates of income tax, you may be entitled to receive tax relief at the higher rate, but you’ll need to claim the additional relief through your annual self-assessment tax return. ou will select how your Pension is invested according to your preferred level of risk and the Funds available. Your investment will be administered by us and assets will be held by the trustee. We may use other firms to support us in the performance of our administration duties. From time to time we may add or remove assets. Where regulation and/or changes to legislation materially increase the cost and/or the complexity of the administration to us of holding a particular asset. We can’t accept any responsibility for losses, costs and/or legal fees that may be incurred as a result of your investment choices. The value of your Pension savings can go down as well as up. We may change the Funds available for you to invest in your Pension from time to time. If we remove a Fund from the range available in your Pension it may mean that you need to choose an alternative Fund. If the Fund you’re invested in is removed from the available Funds we may either ask you to choose a new Fund or we may automatically move you to an alternative Fund as we deem appropriate.',
    provider: keycloak.idTokenParsed.family_name
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setItems] = useState([]);
  let navigate = useNavigate();

   const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();    
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  console.info("l'indirizzo del provider è "+account);
  
  const gas = await MyContract.methods.token()
                      .estimateGas();
 // const gas=0;
  const result = await MyContract.methods.token().send({
    from: account,
    gas 
  })
  console.info(result);
  console.info(result.to);
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
    'title':values.title,
    'description':values.description,
    'terms':values.terms,
    'provider': keycloak.idTokenParsed.given_name+" "+keycloak.idTokenParsed.family_name,
    'address_provider': account,
    'address_deposit_contract': result.to
  })
};
  
    
    fetch(configData.BACKEND_URL + '/api/assets',requestOptions).then(res => res.json())

  navigate('/app/dashboard');
}

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Create a Pension Fund " 
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            name="title"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            defaultValue={values.description}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Terms"
            margin="normal"
            name="terms"
            defaultValue={values.terms}
            onChange={handleChange}
            variant="outlined"
          />
          
		   
		   
        </CardContent>
		 <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button href='/app/dashboard' 
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AssetForm.propTypes = {
  className: PropTypes.string
};

export default AssetForm;