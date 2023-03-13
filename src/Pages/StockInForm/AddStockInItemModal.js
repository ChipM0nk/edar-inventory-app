// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { CustomAutoComplete } from 'Components/Common/customAutoComplete';
import CustomModal from 'Components/Modal/CustomModal';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StockInItemSchema } from './schema/schemas';

export default function AddStockinItemModal({ show, onClose, filteredProducts, onAddItem }) {
  /** react-hook-form start */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isDirty },
    control
  } = useForm({
    resolver: yupResolver(StockInItemSchema)
  });
  useState(() => {
    reset({});
  });

  const [product, setProduct] = useState({});

  function handleSelectProduct(product) {
    resetFields(product);
  }

  function handleClose() {
    onClose();
    resetFields({});
  }

  function resetFields(product) {
    setProduct(product);
    setValue('product', product);
    setValue('itemAmount', product?.productPrice ?? 0);
    setValue('quantity', 0);
    setValue('itemTotalAmount', 0);

    clearErrors('product');
    clearErrors('quantity');
    clearErrors('itemTotalAmount');
  }
  useEffect(() => {
    if (!show) handleClose();
  }, [show]);

  const onSubmit = (data) => {
    onAddItem(data);
    handleClose();
  };
  const onInvalid = (errors) => console.error(errors);
  return (
    <CustomModal title="Add Item" show={show} onClose={handleClose} height={570} width={360}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="add-item-grid-form">
          <CustomAutoComplete
            autoFocus={true}
            options={filteredProducts}
            control={control}
            width={300}
            onChange={handleSelectProduct}
            name="product"
            placeholder="Select Product"
            optionId="productId"
            optionCode="productCode"
            optionLabel="productName"
          />
          {/**Reset this later */}
          <TextField
            label="Category"
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            value={product?.category?.categoryName ?? ''}
            sx={{ width: 300 }}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            defaultValue={0}
            type="number"
            inputProps={{ step: 'any' }}
            {...register('quantity', {
              onChange: (e) => {
                const total = Math.round(e.target.value * getValues('itemAmount') * 100) / 100;
                setValue('itemTotalAmount', total);
              }
            })}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
            error={errors.quantity ? true : false}
            helperText={errors.quantity && errors.quantity.message}
          />
          <TextField
            label="Item Amount"
            variant="outlined"
            type="number"
            step="0.01"
            {...register('itemAmount', {
              onChange: (e) => {
                const total = Math.round(e.target.value * getValues('quantity') * 100) / 100;
                setValue('itemTotalAmount', total);
              }
            })}
            inputProps={{ step: 'any' }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
            error={errors.itemAmount ? true : false}
            helperText={errors.itemAmount && errors.itemAmount.message}
          />
          <TextField
            label="Total"
            variant="outlined"
            disabled
            {...register('itemTotalAmount')}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
          />
        </div>
        <div className="button-div">
          <LoadingButton
            className="modal-button"
            variant="contained"
            type="submit"
            disabled={!isDirty}>
            SUBMIT
          </LoadingButton>
        </div>
      </form>
    </CustomModal>
  );
}
