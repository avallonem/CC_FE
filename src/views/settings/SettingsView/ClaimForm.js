import React, { useState } from 'react';
import {useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AgreementCheckbox from './AgreementCheckbox';
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
import { pensionNotarization } from 'src/abis.js';
import keycloak from 'src/';
import AlertDialog from './AlertDialog';
import configData from 'src/config.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddr = configData.NOTARIZATION_CONTRACT;
const MyContract = new web3.eth.Contract(pensionNotarization, contractAddr);
var md5 = require('md5');

const useStyles = makeStyles(({
  root: {}
}));

const ClaimForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    surname: ''
  });
  const [contatore, setContatore] = useState(0);
  const [hashed,setHashed]=useState(0);
  const stringa=values.name + values.surname;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setItems] = useState([]);
  const [primavolta,setPrimaVolta]=useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(configData.BACKEND_URL + '/api/customers?family_name=' + keycloak.idTokenParsed.family_name)
          .then(res => res.json())
          .then(
            (result) => {         
              setItems(result);
              console.info(products.length);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setError(error);
            }
          )
        }, [])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();    
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
    'given_name':keycloak.idTokenParsed.given_name,
    'family_name':keycloak.idTokenParsed.family_name,
    'fiscal_number':keycloak.idTokenParsed.fiscal_number,
    'place_of_birth': keycloak.idTokenParsed.place_of_birth,
    'date_of_birth': keycloak.idTokenParsed.date_of_birth,
    'country_of_birth': keycloak.idTokenParsed.country_of_birth,
    'mobile_phone': keycloak.idTokenParsed.mobile_phone,
    'gender': keycloak.idTokenParsed.gender,
    'asset_title': sessionStorage.getItem('asset_title'),
    'asset_description': sessionStorage.getItem('asset_description'),
    'asset_terms':sessionStorage.getItem('asset_terms'),
    'asset_provider':sessionStorage.getItem('asset_provider'),
    'asset_address_provider': sessionStorage.getItem('asset_address_provider'),
    'asset_address_deposit_contract': sessionStorage.getItem('asset_address_deposit_contract')
  })
};
  if (products.length<1){
   setHashed(md5(keycloak.idTokenParsed.family_name));
  

  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  //const gas = await MyContract.methods.setContract('1',hashed)
    //                  .estimateGas();
  const gas=0;
  const result = await MyContract.methods.setContract('1',hashed).send({
    from: account,
    gas 
  })
  console.info(result);
  fetch(configData.BACKEND_URL + '/api/customers',requestOptions).then(res => res.json())
  
  navigate('/financial/products');
  }else window.alert('Unauthorized request: You are already registered to a Pension Fund');



}
  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={sessionStorage.getItem('asset_title')}
          title="Pension Fund Subscription " 
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="Name"
			      defaultValue={keycloak.idTokenParsed.given_name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Surname"
            margin="normal"
            name="confirm"
			      defaultValuevalue={keycloak.idTokenParsed.family_name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Gender"
            margin="normal"
            name="Gender"
            defaultValue={keycloak.idTokenParsed.gender}
            onChange={handleChange}
            variant="outlined"
          />
		   <TextField
            fullWidth
            label="Social Security Number/Fiscal Number"
            margin="normal"
            name="Social Security Number/Fiscal Number"
            defaultValue={keycloak.idTokenParsed.fiscal_number.substring(6)}
            onChange={handleChange}
            variant="outlined"
          />
		   <TextField
            fullWidth
            label="Date of Birth"
            margin="normal"
            name="Date of Birth"
            defaultValue={keycloak.idTokenParsed.date_of_birth}
            onChange={handleChange}
            variant="outlined"
          />
		   <TextField
            fullWidth
            label="Country of Birth"
            margin="normal"
            name="Country of Birth"
            defaultValue={keycloak.idTokenParsed.country_of_birth}
            onChange={handleChange}
            variant="outlined"
          />
		   <TextField
            fullWidth
            label="City of Birth"
            margin="normal"
            name="City of Birth"
            defaultValue={keycloak.idTokenParsed.place_of_birth}
            onChange={handleChange}
            variant="outlined"
          />
		   <TextField
            fullWidth
            label="email address"
            margin="normal"
            name="email address"
            defaultValue={keycloak.idTokenParsed.email}
            onChange={handleChange}
            variant="outlined"
          />
		   <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            name="Phone Number"
            defaultValue={keycloak.idTokenParsed.mobile_phone}
            onChange={handleChange}
            variant="outlined"
          />
		   
        </CardContent>
        <Divider />
		<CardContent>
		<ExpansionPanel>
		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}><h3>READ CAREFULLY ALL THE TERMS AND CONDITIONS</h3></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.heading}>
		  <h4>TERMS 1.</h4> You’ll open your Pension by completing the online application. When you do this we’ll set up an account for you and you’ll become a member of the scheme. 
		  <h4>TERMS 2.</h4> The scheme provides pension accounts for many customers, of whom you are one. The money that you pay in builds up to create your pension pot. The Personal Pension is suitable for eligible customers who want to save towards their retirement, and are happy to make their own investment decisions. You’ll have access to a range of investment options to meet your attitude to risk as well as online support.
		  <h4>TERMS 3.</h4> The scheme was established by a declaration of trust and is governed by a set of scheme rules which are required for it to be a registered pension scheme. The investments and money in the scheme are held by the trustee in the trustee’s name. Benefits under the scheme are payable by the trustee on our instruction. We’ll automatically claim basic rate tax relief from the government, based on the value of your payment, and we’ll add it to your Pension by no later than the end of business the following working day.
		  <h4>TERMS 4.</h4> If you pay one of the higher rates of income tax, you may be entitled to receive tax relief at the higher rate, but you’ll need to claim the additional relief through your annual self-assessment tax return. You will select how your Pension is invested according to your preferred level of risk and the Funds available. Your investment will be administered by us and assets will be held by the trustee. We may use other firms to support us in the performance of our administration duties. From time to time we may add or remove assets.
		  <h4>TERMS 5.</h4> Where regulation and/or changes to legislation materially increase the cost and/or the complexity of the administration to us of holding a particular asset. We can’t accept any responsibility for losses, costs and/or legal fees that may be incurred as a result of your investment choices. The value of your Pension savings can go down as well as up.
		  <h4>TERMS 6.</h4> We may change the Funds available for you to invest in your Pension from time to time. If we remove a Fund from the range available in your Pension it may mean that you need to choose an alternative Fund. If the Fund you’re invested in is removed from the available Funds we may either ask you to choose a new Fund or we may automatically move you to an alternative Fund as we deem appropriate. We’ll notify you by email if the Funds available change and if the Fund you’re invested in is affected, giving you at least 30 days’ notice before any such change takes effect. Any cash you hold in your Pension that’s not invested will be held in a bank account in the name of the trustee. You’ll be able to see the value of the cash held in your Pension at any time, by logging onto My Account. The bank account your cash is held in does not attract interest and therefore you won’t receive any return on any cash balance you hold in your Pension. 
		  </Typography>
		 
		  </ExpansionPanelDetails>
		  <Divider />
		  <ExpansionPanelActions>
           <AgreementCheckbox />
        </ExpansionPanelActions>
		</ExpansionPanel>
		</CardContent>
		 <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button href='/financial/dashboard' 
            color="text"
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

ClaimForm.propTypes = {
  className: PropTypes.string
};

export default ClaimForm;