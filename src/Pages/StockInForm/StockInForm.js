/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Box, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuppliersThunk } from 'store/supplier/thunk';
import { CustomAutoComplete } from 'Components/Common/customAutoComplete';
import { DatePicker, DatePickerToolbar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';

import './stockinform.page.css';
import CustomDatePicker from 'Components/Common/customDatePicker';
import { DataGrid } from '@mui/x-data-grid';

const StockInItemSchema = yup.object().shape({
  purchaseItemId: yup.number(),
  product: yup.object().shape({
    productCode: yup.string(),
    productName: yup.string(),
    productDescription: yup.string(),
    category: yup.object().shape({
      categoryId: yup.string(),
      categoryName: yup.string()
    }),
    productPrice: yup.number()
  }),
  itemAmount: yup
    .number()
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    ),
  quantity: yup
    .number()
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    ),
  itemTotalAmount: yup
    .number()
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    )
});

const StockInFormSchema = yup.object().shape({
  purchaseId: yup.number(),
  supplierInvoiceNo: yup.string().required('Required'),
  batchCode: yup.string(),
  supplier: yup.object().shape({
    supplierId: yup
      .number()
      .typeError('Please select a supplier')
      .required('Please select a supplier')
  }),
  purchaseDate: yup.date().typeError('Invalid Date').required('Required').default(new Date()),
  staff: yup.object().shape({
    userId: yup.number(),
    userName: yup.string()
  }),
  purchaseItems: yup.array().of(StockInItemSchema).min(1).required('At least 1 item is required'),
  totalAmount: yup.number().required(),
  created: yup.date(),
  remarks: yup.string()
});

export default function StockInForm() {
  /** MUI Daagrid column start */
  const mockRows = [
    {
      id: 1,
      product: {
        productCode: 'Code 1',
        productName: 'Product 1',
        productDescription: 'Product Description 1'
      },
      itemAmount: 1200.0,
      quantity: 1,
      itemTotalAmount: 1200
    }
  ];

  const columns = [
    {
      field: 'product.productCode',
      headerName: 'Product Code',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'product.productName',
      headerName: 'Product Name',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'product.productDescription',
      headerName: 'Product Description',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'itemAmount',
      headerName: 'Price',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'itemTotalAmount',
      headerName: 'Total Amount',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    }
  ];

  /** MUI Daagrid column end */

  /**Form definition start */
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(StockInFormSchema)
  });
  const onInvalid = (errors) => console.error(errors);

  const onSubmit = (data) => {
    // console.log(data);
  };
  /**Form definition end */

  /** On Load start */
  const dispatch = useDispatch();
  const onLoad = useRef(true);
  useEffect(() => {
    dispatch(getAllSuppliersThunk());
    onLoad.current = false;
  }, [dispatch]);

  const { suppliers } = useSelector((state) => state.supplier);

  /** On Load end */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="stock-in-form">
          <CustomAutoComplete
            options={suppliers}
            sx={{ width: 250 }}
            control={control}
            name="supplier.supplierId"
            placeholder="Select Supplier"
            optionId="supplierId"
            optionLabel="supplierName"
          />
          <TextField
            variant="outlined"
            error={errors.supplierInvoiceNo ? true : false}
            label="Supplier Invoice No."
            size="small"
            {...register('supplierInvoiceNo')}
            sx={{ width: 250 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.supplierInvoiceNo && errors.supplierInvoiceNo.message}
          />

          <CustomDatePicker control={control} name="purchaseDate" label="Purchase Date" />

          <TextField
            variant="outlined"
            error={errors.remarks ? true : false}
            label="Remarks"
            size="small"
            {...register('remarks')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.remarks && errors.remarks.message}
          />
        </div>
        <Box sx={{ height: 550, width: 800, color: '#153d02' }}>
          <DataGrid
            rows={mockRows}
            columns={columns}
            rowHeight={40}
            rowsPerPageOptions={[10, 20, 30]}
            disableSelectionOnClick
            sx={{
              borderColor: '#153d02',
              '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
                display: 'none'
              }
            }}
            // onRowClick={(item) => props.onRowClick(item.row)}
          />
        </Box>
        <LoadingButton
          className="modal-button"
          variant="contained"
          type="submit"
          loading={false}
          disabled={!isDirty}>
          SUBMIT
        </LoadingButton>
      </form>
    </div>
  );
}
