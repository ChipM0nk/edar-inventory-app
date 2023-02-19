// @ts-nocheck
import { Button, TextField } from '@mui/material';

import Modal from 'Components/Modal/Modal';
import useForm from 'lib/useForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryThunk } from 'store/category/thunk';

export const stateValidatorSchema = {
  categoryCode: {
    value: '',
    error: '',
    required: true,
    validator: {
      func: (value) => /^[0-9]{1,5}$/.test(value),
      error: 'Input 5 digit code only'
    }
  },
  categoryName: {
    value: '',
    error: '',
    required: true,
    validator: {
      func: (value) => /^[a-zA-Z0-9///" ]+$/.test(value),
      error: 'Invalid Category Name'
    }
  }
};
export default function CategoryModal(props) {
  const dispatch = useDispatch();

  const { isSuccess, error } = useSelector((state) => ({
    isSuccess: state.category.isSuccess,
    error: state.category.error
  }));

  useEffect(() => {
    if (isSuccess) {
      resetValues();
    } else if (error) {
      alert(error);
    }
  }, [isSuccess, error]);
  async function onSubmitForm(state) {
    dispatch(addCategoryThunk(state));
  }

  const { values, handleOnChange, handleOnSubmit, disable, resetValues, errors, dirty } = useForm(
    stateValidatorSchema,
    onSubmitForm
  );

  const { categoryCode, categoryName } = values;

  function handleClose() {
    resetValues();
    props.onClose();
  }
  return (
    <Modal
      title={props.isAdd ? 'Add Category' : 'Edit Category'}
      show={props.show}
      onClose={handleClose}
      height={250}
      width={300}>
      <form onSubmit={handleOnSubmit}>
        <div className="category-form" id="category-form">
          <div>
            <TextField
              error={errors.categoryCode && dirty.categoryCode ? true : false}
              variant="outlined"
              label="Category Code"
              name="categoryCode"
              size="small"
              style={{ textAlign: 'center' }}
              value={categoryCode}
              sx={{ width: 250 }}
              onChange={handleOnChange}
              helperText={errors.categoryCode && dirty.categoryCode && errors.categoryCode}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              error={errors.categoryName && dirty.categoryName ? true : false}
              label="Category Name"
              name="categoryName"
              size="small"
              value={categoryName}
              sx={{ width: 250 }}
              onChange={handleOnChange}
              helperText={errors.categoryName && dirty.categoryName && errors.categoryName}
            />
          </div>
        </div>
        <Button variant="contained" type="submit" disabled={disable}>
          LOGIN
        </Button>
      </form>
    </Modal>
  );
}
