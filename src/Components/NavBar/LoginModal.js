// @ts-nocheck
import { Button, Grid, TextField } from '@mui/material';

import useForm from 'lib/useForm';
import Modal from 'Components/Modal/Modal';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { loginThunk } from 'store/authenticate/thunk';

export const stateValidatorSchema = {
  username: {
    value: '',
    error: '',
    required: true,
    validator: {
      func: () => true,
      error: ''
    }
  },
  password: {
    value: '',
    error: '',
    required: true,
    validator: {
      func: () => true,
      error: ''
    }
  }
};

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => ({
    isLoggedIn: state.authenticate.isLoggedIn,
    error: state.authenticate.error
  }));

  useEffect(() => {
    if (isLoggedIn) {
      resetValues();
    } else if (error) {
      alert(error);
    }
  }, [isLoggedIn, error]);

  async function onSubmitForm(state) {
    dispatch(loginThunk(state));
  }

  const { values, handleOnChange, handleOnSubmit, disable, resetValues, errors, dirty } = useForm(
    stateValidatorSchema,
    onSubmitForm
  );

  const { username, password } = values;

  function handleClose() {
    resetValues();
    props.onClose();
  }
  return (
    <Modal
      title="LOGIN"
      show={props.show}
      onClose={handleClose}
      showFooter={false}
      height={props.height ? props.height : 280}
      width={props.width ? props.width : 300}>
      <form
        className="login-form"
        id="login-form"
        onSubmit={handleOnSubmit}
        style={{ textAlign: 'center' }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item sx={{ height: 60, margin: 1 }}>
            <TextField
              error={errors.username && dirty.username ? true : false}
              variant="outlined"
              label="Username"
              name="username"
              size="small"
              value={username}
              sx={{ width: 250 }}
              onChange={handleOnChange}
              helperText={errors.username && dirty.username && errors.username}
            />
          </Grid>
          <Grid item sx={{ height: 60, margin: 1 }}>
            <TextField
              variant="outlined"
              error={errors.password && dirty.password ? true : false}
              label="Password"
              name="password"
              type="password"
              size="small"
              value={password}
              sx={{ width: 250 }}
              onChange={handleOnChange}
              helperText={errors.password && dirty.password && errors.password}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" disabled={disable}>
              LOGIN
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
