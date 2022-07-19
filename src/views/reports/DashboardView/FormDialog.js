import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Web3 from 'web3';
import { Escrow } from 'src/abis.js';

import configData from 'src/config.json';
import keycloak from 'src';
import { DesktopWindows } from '@material-ui/icons';

const web3 = new Web3(Web3.givenProvider);
    
const contractAddr = configData.ESCROW_CONTRACT;
//const contractAddr = configData.ERC20_CONTRACT;
const returnedAddr = configData.ADDRESS_RETURNED;


            
        
//const escrow = new web3.eth.Contract(abi, contractAddr);      
//const MyContract = new web3.eth.Contract(ERC20Basic, contractAddr);
//const SecondContract = new web3.eth.Contract(ERC20Basic, configData.ERC20_CONTRACT);
const FormDialog = ({asset_provider, asset_address_provider }) => {
  const [open, setOpen] = React.useState(false);
  const [addr, setAddr]=useState('');
  const [addrs, setAddrs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleClickOpen = async(e) => {
    setOpen(true);
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

  const handleDeposit = async (e) =>  {
    e.preventDefault();    
    setOpen(false);
    /*const accounts = await window.ethereum.enable();
  const account = accounts[0];
  console.info(amount);
  const gas = await MyContract.methods.deposit(returnedAddr,parseInt(amount))
                      .estimateGas();
  const result = await MyContract.methods.deposit(returnedAddr,parseInt(amount)).send({
    from: account,
    gas 
  })
  */
const value= parseInt(amount)*1000000000000000000;
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
  console.log('Calling the smart contract');
  const escrow=new web3.eth.Contract(Escrow,addr);
  //const gas = await escrow.methods.escrowEth(account,2)
    //                  .estimateGas();
  const result = await escrow.methods.escrowEth(account,2).send({
    from: account,
    value: value,
    gas: 0
  }, function (error, result) { if (!error) {  

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
      'from_address': account,
      'from_name': keycloak.idTokenParsed.family_name,
      'to_address':asset_address_provider,
      'to_name': asset_provider,
      'description': 'Deposit ETH in Fund',
      'amount': amount
    })
  };
    
      
      fetch(configData.BACKEND_URL + '/api/transactions',requestOptions).then(res => {res.json();window.location.reload(true);})
  
  
  }
});
  /*const gas = await MyContract.methods.transfer(returnedAddr,1)
                      .estimateGas();
  const result = await MyContract.methods.transfer(returnedAddr,1).send({
    from: account,
    gas 
  })*/

 /* const gas = await SecondContract.methods.balanceOf(account)
                      .estimateGas();
  const result = await SecondContract.methods.balanceOf(account).call();
  console.info(result);
  };*/

  
  


}
  return (
    <div>
      <Button variant="outlined" color='#088e9d' onClick={handleClickOpen}>
        DEPOSIT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Deposit Cryptocurrency in the pension fund</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the amount of cryptocurrency that you want to deposit in the fund
          </DialogContentText>
          <TextField autofocus margin="dense" id="deposit" label="Ether to Deposit" variant="outlined" fullWidth value={amount} onChange={evt => updateInputValue(evt)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="text">
            Cancel
          </Button>
          <Button onClick={handleDeposit} color="text">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;