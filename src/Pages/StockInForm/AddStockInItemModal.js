// @ts-nocheck
/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { getValue } from '@mui/system';
import { CustomAutoComplete } from 'Components/Common/customAutoComplete';
import CustomModal from 'Components/Modal/CustomModal';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StockInItemSchema } from './schema/schemas';

export default function AddStockinItemModal({ show, handleClose, filteredProducts }) {
  /** react-hook-form start */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty },
    control
  } = useForm({
    resolver: yupResolver(StockInItemSchema)
  });

  const [product, setProduct] = useState({});

  function handleSelectProduct(product) {
    setProduct(product);
    setValue('itemAmount', product?.productPrice ?? 0);
    setValue('quantity', 0);
    setValue('itemTotalAmount', 0);
  }

  return (
    <CustomModal title="Add Item" show={show} onClose={handleClose} height={550} width={700}>
      <form className="add-item-grid">
        <CustomAutoComplete
          options={filteredProducts}
          control={control}
          width={300}
          onChange={handleSelectProduct}
          name="product.productId"
          placeholder="Select Product"
          optionId="productId"
          optionCode="productCode"
          optionLabel="productName"
        />
        <TextField
          label="Category"
          variant="outlined"
          disabled
          InputLabelProps={{ shrink: true }}
          value={product?.category?.categoryName ?? ''}
          sx={{ width: 300 }}
        />
        <TextField
          label="Item Amount"
          variant="outlined"
          {...register('itemAmount', {
            onChange: (e) => {
              const total = e.target.value * getValues('quantity');
              setValue('itemTotalAmount', total);
            }
          })}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 300 }}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          defaultValue={0}
          {...register('quantity', {
            onChange: (e) => {
              const total = e.target.value * getValues('itemAmount');
              setValue('itemTotalAmount', total);
            }
          })}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 300 }}
        />

        <TextField
          label="Total"
          variant="outlined"
          disabled
          {...register('itemTotalAmount')}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 300 }}
        />
      </form>
    </CustomModal>
  );
}
