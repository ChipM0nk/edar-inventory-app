// @ts-nocheck
import React from 'react';
import { Button } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import Countries from './Countries';

export default function StockIns() {
  // const { control, handleSubmit } = useForm({});
  return (
    // <form onSubmit={handleSubmit((data) => console.log(data))}>
    //   <Countries control={control} />
    <Button variant="contained" color="primary" type="submit">
      Get country code
    </Button>
    // </form>
  );
}
