// @ts-nocheck
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

import Modal from 'Components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductThunk, updateProductThunk } from 'store/product/thunk';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ProductSchema = yup.object().shape({
  productCode: yup
    .string()
    .required('Product Code is required')
    .matches(/^[a-zA-Z0-9/-///" ]{3,10}$/, 'Please input 3-10 alphanumeric characters'),
  productName: yup
    .string()
    .required('Product Name is required')
    .matches(/^[a-zA-Z0-9/-///" ]{2,50}$/, 'Please input 2-50 alphanumeric characters'),
  productDescription: yup
    .string()
    .required('Product Address is required')
    .matches(/^[a-zA-Z0-9#/-///\r\n" ]{3,150}$/, 'Please input 3-150 alphanumeric characters'),
  productPrice: yup
    .number()
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    ),
  unit: yup
    .string()
    .required('Product unit is required')
    .matches(/^[a-zA-Z]{1,10}$/, 'Please input 1-10 alpha numeric characters')
});

export default function ProductModal(props) {
  const dispatch = useDispatch();
  const [product, setProductState] = useState(props.product);
  const [show, setShow] = useState(props.product);
  if (props.show !== show) setShow(props.show);

  if (props.product !== product) setProductState(props.product);

  const { isProcessing } = useSelector((state) => state.product.isProcessing);

  function handleClose() {
    props.onClose();
    reset(props.initSchema);
  }

  /**react-hook-form start */

  useEffect(() => {
    reset(product);
  }, [product]);

  useEffect(() => {
    if (!show) handleClose();
  }, [show]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(ProductSchema)
  });

  const onSubmit = (data) => {
    if (props.isAdd) {
      dispatch(addProductThunk(data));
    } else {
      dispatch(updateProductThunk({ ...product, ...data }));
    }
  };

  return (
    <Modal
      title={props.isAdd ? 'Add Product' : 'Edit Product'}
      show={props.show}
      onClose={handleClose}
      height={550}
      width={700}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="product-form" id="product-form">
          <div>
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
          </div>
          <div>
            <TextField
              error={errors.productName ? true : false}
              variant="outlined"
              label="Product Name"
              size="small"
              {...register('productName')}
              style={{ textAlign: 'center' }}
              sx={{ width: 300 }}
              inputProps={{ maxLength: 50 }}
              helperText={errors.productName && errors.productName.message}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.productDescription ? true : false}
              label="Product Description"
              size="small"
              multiline
              rows={3}
              {...register('productDescription')}
              sx={{ width: 630 }}
              inputProps={{ maxLength: 150 }}
              helperText={errors.productDescription && errors.productDescription.message}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.productPrice ? true : false}
              label="Email Address"
              size="small"
              {...register('productPrice')}
              sx={{ width: 300 }}
              inputProps={{ maxLength: 50 }}
              helperText={errors.productPrice && errors.productPrice.message}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.productPrice ? true : false}
              label="Contact Number"
              size="small"
              {...register('productContactNumber')}
              sx={{ width: 300 }}
              inputProps={{ maxLength: 50 }}
              helperText={errors.productPrice && errors.productPrice.message}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.productPrice ? true : false}
              label="Contact Number"
              size="small"
              {...register('productContactNumber')}
              sx={{ width: 300 }}
              inputProps={{ maxLength: 50 }}
              helperText={errors.productPrice && errors.productPrice.message}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.productPrice ? true : false}
              label="Contact Number"
              size="small"
              {...register('productContactNumber')}
              sx={{ width: 300 }}
              inputProps={{ maxLength: 50 }}
              helperText={errors.productPrice && errors.productPrice.message}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.productPrice ? true : false}
              label="Contact Number"
              size="small"
              {...register('productContactNumber')}
              sx={{ width: 300 }}
              inputProps={{ maxLength: 50 }}
              helperText={errors.productPrice && errors.productPrice.message}
            />
          </div>
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
              const init = props.isAdd ? props.initSchema : props.product;
              reset(init);
            }}
            loading={isProcessing}
            disabled={!isDirty}>
            RESET
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
