// @ts-nocheck
import { Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../store/category/thunk';
import CustomDataGrid from '../../Components/CustomDataGrid/customDataGrid';
import { CustomButton } from 'Components/Button/customButton';
import CategoryModal from './CategoryModal';

const columns = [
  { field: 'categoryId', headerName: 'ID', width: 90 },
  {
    field: 'categoryCode',
    headerName: 'Category Code',
    width: 150,
    editable: false
  },
  {
    field: 'categoryName',
    headerName: 'Category Name',
    width: 150,
    editable: false
  }
];

export default function Category() {
  const dispatch = useDispatch();

  const { categories, isLoading, error } = useSelector((state) => ({
    categories: state.category.data,
    isLoading: state.category.loading,
    error: state.category.error
  }));

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  return (
    <div className="category">
      <Stack direction="row" justifyContent="start">
        <TextField
          variant="standard"
          placeholder="Search Category....."
          onChange={(e) => searchItems(e.target.value)}
          sx={{ width: '250px' }}
        />

        <CustomButton sx={{ width: 60 }}>Add</CustomButton>
      </Stack>
      <CustomDataGrid
        categories={categories}
        columns={columns}
        isLoading={isLoading}
        searchInput={searchInput}
        error={error}
      />
      <CategoryModal />
    </div>
  );
}
