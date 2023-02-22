import { LoadingButton } from '@mui/lab';
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

export default function CustomDialog(props) {
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
      {props.isAlert ? (
        <DialogActions>
          <Button variant="outlined" size="small" onClick={props.onClose}>
            Ok
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <LoadingButton
            loading={props.loading ?? false}
            variant="outlined"
            size="small"
            onClick={props.onOkClick}>
            Ok
          </LoadingButton>
          <LoadingButton
            loading={props.loading ?? false}
            variant="outlined"
            size="small"
            onClick={props.onClose}>
            Cancel
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
}
