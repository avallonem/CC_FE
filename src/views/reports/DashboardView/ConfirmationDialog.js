import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@material-ui/core";
  
  const ConfirmationDialog = ({
    open,
    title,
    variant,
    description,
    onSubmit,
    onClose
  }) => {
    return (
      <Dialog open={open}>
        <DialogTitle>Redemption confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you confirm the redemption request for the complete amount of the fund?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onSubmit}>
            YES, I AGREE
          </Button>
          <Button color="primary" onClick={onClose} autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationDialog;