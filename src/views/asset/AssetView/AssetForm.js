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
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    terms: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
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