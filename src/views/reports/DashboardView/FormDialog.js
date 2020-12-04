import React from 'react';
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
import { ERC20Basic } from 'src/abis.js';
import configData from 'src/config.json';
import keycloak from 'src';

const web3 = new Web3(Web3.givenProvider);
const contractAddr = configData.ESCROW_CONTRACT;
//const contractAddr = configData.ERC20_CONTRACT;
const returnedAddr = configData.ADDRESS_RETURNED;
const MyContract = new web3.eth.Contract(Escrow, contractAddr);
//const MyContract = new web3.eth.Contract(ERC20Basic, contractAddr);
//const SecondContract = new web3.eth.Contract(ERC20Basic, configData.ERC20_CONTRACT);
const FormDialog = ({asset_provider, asset_address_provider }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeposit = async (e) =>  {
    e.preventDefault();    
    setOpen(false);
    const accounts = await window.ethereum.enable();
  const account = accounts[0];
  const gas = await MyContract.methods.deposit(returnedAddr)
                      .estimateGas();
  const result = await MyContract.methods.deposit(returnedAddr).send({
    from: account,
    gas 
  })
  /*const gas = await MyContract.methods.transfer(returnedAddr,1)
                      .estimateGas();
  const result = await MyContract.methods.transfer(returnedAddr,1).send({
    from: account,
    gas 
  })*/
  console.info(result);
 /* const gas = await SecondContract.methods.balanceOf(account)
                      .estimateGas();
  const result = await SecondContract.methods.balanceOf(account).call();
  console.info(result);
  };*/
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
    'from_address': account,
    'from_name': keycloak.idTokenParsed.family_name,
    'to_address':asset_address_provider,
    'to_name': asset_provider,
    'description': 'Deposit ETH in Fund',
    'amount': '1 ETH'
  })
};
  
    
    fetch(configData.BACKEND_URL + '/api/transactions',requestOptions).then(res => res.json())





}
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        DEPOSIT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Deposit Cryptocurrency in the pension fund</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the amount of cryptocurrency that you want to deposit in the fund
          </DialogContentText>
          <TextField autofocus margin="dense" id="deposit" label="Ether to Deposit" variant="outlined" fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeposit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;