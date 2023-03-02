/* eslint-disable no-unused-vars */
// @ts-nocheck
import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { getAllSuppliersThunk } from 'store/supplier/thunk';

const StockInFormSchema = yup.object().shape({
  purchaseId: yup.number(),
  supplierInvoiceNo: yup.string(),
  batchCode: yup.string(),
  supplier: yup.object().shape({
    supplierId: yup.number().required('Please select a supplier')
  }),
  purchaseDate: yup.date(),
  staff: yup.object().shape({
    userId: yup.number(),
    userName: yup.string()
  }),
  purchaseItems: yup.array().min(1).required('At least 1 item is required'),
  totalAmount: yup.number().required(),
  created: yup.date(),
  remarks: yup.string()
});

export default function StockInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(StockInFormSchema)
  });

  const dispatch = useDispatch();
  const onLoad = useRef(true);
  useEffect(() => {
    dispatch(getAllSuppliersThunk());
    onLoad.current = false;
  }, [dispatch]);

  return (
    <div>
      <form className="stock-in-form">
        <TextField
          error={errors.productCode ? true : false}
          variant="outlined"
          label="Product Code"
          size="small"
          {...register('productCode')}
          style={{ textAlign: 'center' }}
          sx={{ width: 300 }}
          inputProps={{ maxLength: 50 }}
          helperText={errors.productCode && errors.productCode.message}
        />
      </form>
    </div>
  );
}
