import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel
} from '@mui/material';
import React from 'react';

export default function AlertDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <InputLabel error={props.error} size="normal" sx={{ fontSize: 13 }}>
            {props.message}
          </InputLabel>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="small" onClick={props.onClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
