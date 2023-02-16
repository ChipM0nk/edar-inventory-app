// @ts-nocheck
import { Grid, TextField } from '@mui/material';
import { CustomButton } from 'Components/Button/customButton';
import useForm from 'lib/useForm';
import Modal from 'Components/Modal/Modal';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { loginThunk } from 'store/authenticate/thunk';
import { stateSchema, stateValidatorSchema } from './loginSchema';

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

  const { values, handleOnChange, handleOnSubmit, disable, resetValues } = useForm(
    stateSchema,
    stateValidatorSchema,
    onSubmitForm
  );

  const { username, password } = values;

  function handleClose() {
    resetValues();
    props.onClose();
  }
  return (
    <Modal title="LOGIN" show={props.show} onClose={handleClose} showFooter={false} height="240px">
      <form
        className="login-form"
        id="login-form"
        onSubmit={handleOnSubmit}
        style={{ textAlign: 'center' }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <TextField
              variant="outlined"
              label="Username"
              name="username"
              size="small"
              value={username}
              sx={{ width: 250 }}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              size="small"
              value={password}
              sx={{ width: 250 }}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item>
            <CustomButton type="submit" disabled={disable}>
              LOGIN
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
