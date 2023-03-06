// @ts-nocheck
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

import CustomModal from 'Components/Modal/CustomModal';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSupplierThunk, updateSupplierThunk } from 'store/supplier/thunk';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SupplierSchema = yup.object().shape({
  supplierName: yup
    .string()
    .required('Supplier Name is required')
    .matches(/^[a-zA-Z0-9/-///" ]{2,50}$/, 'Please input 3-50 alphanumeric characters'),
  supplierAddress: yup
    .string()
    .required('Supplier Address is required')
    .matches(/^[a-zA-Z0-9#/-///\r\n" ]{3,150}$/, 'Please input 3-150 alphanumeric characters'),
  supplierEmailAdd: yup
    .string()
    .required('Email address is required')
    .matches(/^[\w-/.]+@([\w-]+.)+[\w-]$/g, 'Please input a valid email address'),
  supplierContactNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[a-zA-Z0-9/-///"/+ ]{3,50}$/, 'Please input valid phone number')
});

export default function SupplierModal({ supplier, show, isAdd, initSchema, onClose }) {
  const dispatch = useDispatch();
  // const [supplier, setSupplierState] = useState(supplier);
  // const [show, setShow] = useState(supplier);
  // if (show !== show) setShow(show);

  // if (supplier !== supplier) setSupplierState(supplier);

  const { isProcessing } = useSelector((state) => state.supplier.isProcessing);

  function handleClose() {
    onClose();
    reset(initSchema);
  }

  /**react-hook-form start */

  useEffect(() => {
    reset(supplier);
  }, [supplier]);

  useEffect(() => {
    if (!show) handleClose();
  }, [show]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(SupplierSchema)
  });

  const onSubmit = (data) => {
    if (isAdd) {
      dispatch(addSupplierThunk(data));
    } else {
      dispatch(updateSupplierThunk({ ...supplier, ...data }));
    }
  };

  return (
    <CustomModal
      title={isAdd ? 'Add Supplier' : 'Edit Supplier'}
      show={show}
      onClose={handleClose}
      height={450}
      width={350}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="supplier-form" id="supplier-form">
          <TextField
            error={errors.supplierName ? true : false}
            variant="outlined"
            label="Supplier Name"
            size="small"
            {...register('supplierName')}
            style={{ textAlign: 'center' }}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.supplierName && errors.supplierName.message}
          />

          <TextField
            variant="outlined"
            error={errors.supplierAddress ? true : false}
            label="Supplier Address"
            size="small"
            multiline
            rows={3}
            {...register('supplierAddress')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 150 }}
            helperText={errors.supplierAddress && errors.supplierAddress.message}
          />

          <TextField
            variant="outlined"
            error={errors.supplierEmailAdd ? true : false}
            label="Email Address"
            size="small"
            {...register('supplierEmailAdd')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.supplierEmailAdd && errors.supplierEmailAdd.message}
          />

          <TextField
            variant="outlined"
            error={errors.supplierContactNumber ? true : false}
            label="Contact Number"
            size="small"
            {...register('supplierContactNumber')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.supplierContactNumber && errors.supplierContactNumber.message}
          />
        </div>
        <div className="button-div">
          <LoadingButton
            className="modal-button"
            variant="contained"
            type="submit"
            loading={isProcessing}
            disabled={!isDirty}>
            SUBMIT
          </LoadingButton>
          <LoadingButton
            className="modal-button"
            variant="contained"
            onClick={() => {
              const init = isAdd ? initSchema : supplier;
              reset(init);
            }}
            loading={isProcessing}
            disabled={!isDirty}>
            RESET
          </LoadingButton>
        </div>
      </form>
    </CustomModal>
  );
}
