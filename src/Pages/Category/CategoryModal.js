// @ts-nocheck
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

import Modal from 'Components/Modal/Modal';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryThunk, updateCategoryThunk } from 'store/category/thunk';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CategorySchema = yup.object().shape({
  categoryCode: yup
    .string()
    .required('Category Code is required')
    .matches(/^[a-zA-Z0-9]{3,6}$/, 'Please input 3-6 alphanumeric characters'),
  categoryName: yup
    .string()
    .required('Category Name is required')
    .matches(/^[a-zA-Z0-9///" ]{3,50}$/, 'Please input 3-50 alphanumeric characters')
});

export default function CategoryModal({ category, show, isAdd, initSchema, onClose }) {
  const dispatch = useDispatch();
  // const [category, setCategoryState] = useState(category);
  // const [show, setShow] = useState(category);
  // if (show !== show) setShow(show);
  // if (category !== category) setCategoryState(category);

  const { isProcessing } = useSelector((state) => state.category.isProcessing);

  function handleClose() {
    onClose();
    reset(initSchema);
  }

  /**react-hook-form start */

  useEffect(() => {
    reset(category);
  }, [category]);

  useEffect(() => {
    if (!show) handleClose();
  }, [show]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(CategorySchema)
  });

  const onSubmit = (data) => {
    if (isAdd) {
      dispatch(addCategoryThunk(data));
    } else {
      dispatch(updateCategoryThunk({ ...category, ...data }));
    }
  };

  return (
    <Modal
      title={isAdd ? 'Add Category' : 'Edit Category'}
      show={show}
      onClose={handleClose}
      height={250}
      width={350}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="category-form" id="category-form">
          <TextField
            error={errors.categoryCode ? true : false}
            variant="outlined"
            label="Category Code"
            size="small"
            {...register('categoryCode')}
            style={{ textAlign: 'center' }}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 6 }}
            helperText={errors.categoryCode && errors.categoryCode.message}
          />

          <TextField
            variant="outlined"
            error={errors.categoryName ? true : false}
            label="Category Name"
            size="small"
            {...register('categoryName')}
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.categoryName && errors.categoryName.message}
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
              const init = isAdd ? initSchema : category;
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
