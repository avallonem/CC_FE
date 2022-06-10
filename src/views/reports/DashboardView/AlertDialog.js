import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Escrow } from 'src/abis.js';
import Web3 from 'web3';
import configData from 'src/config.json';
import keycloak from 'src';
const web3 = new Web3(Web3.givenProvider);
    
const contractAddr = configData.ESCROW_CONTRACT;

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [addr, setAddr]=useState('');
  const [addrs, setAddrs] = useState([]);
  const [balance, setBalance]=useState(0);
  const [amount, setAmount] = useState(0);
  const [orders, setItems] = useState([]);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleClickOpen = async(e) => {
    setOpen(true);
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
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )

    fetch(configData.BACKEND_URL + '/api/customers?family_name=' + keycloak.idTokenParsed.family_name)
    .then(res => res.json())
    .then(
      (addrs) => {
          setAddrs(addrs);
          console.info(addrs[0].asset_address_deposit_contract);
          setAddr(addrs[0].asset_address_deposit_contract)
      }
      ,

      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )

  };

  const handleClose = () => {
    setOpen(false);

  };
  const updateInputValue = (evt) => {
    setAmount(evt.target.value)
    }
 const handleRedeem = async(e) => {
  e.preventDefault(); 
    setOpen(false);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const neg_amount= -balance;
    console.log('Calling the smart contract');
    const escrow=new web3.eth.Contract(Escrow,addr);
    const result = await escrow.methods.redeemAllAvailableEth().send({
      from: account,
      gas: 0
    }, function (error, result) { if (!error) {  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        'from_address': account,
        'from_name': keycloak.idTokenParsed.family_name,
        'to_address':addr,
        'description': 'Redemption of the entire fund',
        'amount': neg_amount
      })
    };
      
        
        fetch(configData.BACKEND_URL + '/api/transactions',requestOptions).then(res => {res.json();window.location.reload(true);})
  
        const requestOptions2 = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
      };
        
          
          fetch(configData.BACKEND_URL + '/api/customers',requestOptions2).then(res => {res.json();window.location.reload(true);})
    

    }
  });

  console.info(result)
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Redemption Request
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Redemption confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Do you confirm the redemption request for the complete amount of the fund ( {balance +"ETH"} )?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRedeem} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}