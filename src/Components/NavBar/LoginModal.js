// @ts-nocheck
import { Button, Grid, TextField } from '@mui/material';

import CustomModal from 'Components/Modal/CustomModal';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { loginThunk } from 'store/authenticate/thunk';
import CustomDialog from 'Components/CustomDialog/customDialog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const initSchema = { username: '', password: '' };
const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => ({
    isLoggedIn: state.authenticate.isLoggedIn,
    error: state.authenticate.error
  }));

  const [open, setOpen] = React.useState(false);
  const handleAlertClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      resetValues();
    } else if (error) {
      setOpen(true);
    }
  }, [isLoggedIn, error]);

  async function onSubmitForm(state) {
    dispatch(loginThunk(state));
  }

  function handleClose() {
    resetValues();
    props.onClose();
  }

  function resetValues() {
    reset(initSchema);
  }

  /**react-hook-form start */

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  return (
    <CustomModal
      title="LOGIN"
      show={props.show}
      onClose={handleClose}
      showFooter={false}
      height={props.height ? props.height : 280}
      width={props.width ? props.width : 300}>
      <form
        className="login-form"
        id="login-form"
        onSubmit={handleSubmit(onSubmitForm)}
        style={{ textAlign: 'center' }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item sx={{ height: 60, margin: 1 }}>
            <TextField
              error={errors.username ? true : false}
              variant="outlined"
              label="Username"
              size="small"
              {...register('username')}
              sx={{ width: 250 }}
              helperText={errors.username && errors.username.message}
            />
          </Grid>
          <Grid item sx={{ height: 60, margin: 1 }}>
            <TextField
              variant="outlined"
              error={errors.password ? true : false}
              label="Password"
              type="password"
              size="small"
              {...register('password')}
              sx={{ width: 250 }}
              helperText={errors.password && errors.password.message}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" disabled={!isDirty}>
              LOGIN
            </Button>
          </Grid>
        </Grid>
      </form>
      <CustomDialog
        title="Login Error"
        message={error}
        error={error ? true : false}
        open={open}
        isAlert
        onClose={handleAlertClose}
      />
    </CustomModal>
  );
}
