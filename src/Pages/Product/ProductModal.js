// @ts-nocheck
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Modal from 'Components/Modal/Modal';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductThunk, updateProductThunk } from 'store/product/thunk';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomAutoComplete } from 'Components/Common/customAutoComplete';

const ProductSchema = yup.object().shape({
  productCode: yup
    .string()
    .required('Product Code is required')
    .matches(/^[a-zA-Z0-9/-///" ]{3,10}$/, 'Please input 3-10 alphanumeric characters'),
  productName: yup
    .string()
    .required('Product Name is required')
    .max(50, 'Maximum of 50 characters only'),
  productDescription: yup
    .string()
    .required('Product Description is required')
    .max(50, 'Maximum of 150 characters only'),
  category: yup.object().shape({
    categoryId: yup.string().required('Please select a category'),
    categoryName: yup.string().required('Please select a category')
  }),
  supplier: yup.object().shape({
    supplierId: yup.number().required('Please select a supplier')
  }),
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

export default function ProductModal({
  product,
  show,
  isAdd,
  initSchema,
  onClose,
  categories,
  suppliers
}) {
  const dispatch = useDispatch();

  const { isProcessing } = useSelector((state) => state.product.isProcessing);

  function handleClose() {
    onClose();
    reset(initSchema);
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
    formState: { errors, isDirty },
    control
  } = useForm({
    resolver: yupResolver(ProductSchema)
  });

  const onSubmit = (data) => {
    if (isAdd) {
      dispatch(addProductThunk(data));
    } else {
      dispatch(updateProductThunk({ ...product, ...data }));
    }
  };
  const onInvalid = (errors) => console.error(errors);

  return (
    <Modal
      title={isAdd ? 'Add Product' : 'Edit Product'}
      show={show}
      onClose={handleClose}
      height={550}
      width={700}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="product-form" id="product-form">
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

          <CustomAutoComplete
            options={categories}
            control={control}
            width={300}
            name="category.categoryId"
            placeholder="Select Category"
            optionId="categoryId"
            optionLabel="categoryName"
          />

          <TextField
            variant="outlined"
            error={errors.productPrice ? true : false}
            label="Selling Price"
            size="small"
            {...register('productPrice')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.productPrice && errors.productPrice.message}
          />

          <CustomAutoComplete
            options={suppliers}
            control={control}
            width={300}
            name="supplier.supplierId"
            placeholder="Select Supplier"
            optionId="supplierId"
            optionLabel="supplierName"
          />

          <TextField
            variant="outlined"
            error={errors.unit ? true : false}
            label="Unit"
            size="small"
            {...register('unit')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.unit && errors.unit.message}
          />

          <TextField
            variant="outlined"
            label="Current Stock"
            size="small"
            defaultValue={product?.currentStock}
            disabled
            sx={{ width: 300 }}
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
              const init = isAdd ? initSchema : product;
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
