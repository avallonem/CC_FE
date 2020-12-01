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
    'asset_description': sessionStorage.getItem('asset_description') 
  })
};
  if (products.length<1){
    
    fetch(configData.BACKEND_URL + '/api/customers',requestOptions).then(res => res.json())

  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  const gas = await MyContract.methods.setContract('1','lucrezia | borgia')
                      .estimateGas();
  const result = await MyContract.methods.setContract('1','lucrezia | borgia').send({
    from: account,
    gas 
  })
  console.info(result);
  navigate('/app/products');
  }else window.alert('Utente già registrato ad un fondo pensione');



}
  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={sessionStorage.getItem('asset_title')}
          title="Claim Financial Digital Asset " 
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
            defaultValue={keycloak.idTokenParsed.fiscal_number}
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
		  <h4>TERMS 1.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		  <h4>TERMS 2.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		  <h4>TERMS 3.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		  <h4>TERMS 4.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		  <h4>TERMS 5.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		  <h4>TERMS 6.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	      <h4>TERMS 7.</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

ClaimForm.propTypes = {
  className: PropTypes.string
};

export default ClaimForm;