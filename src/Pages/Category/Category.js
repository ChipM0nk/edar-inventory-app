// @ts-nocheck
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './category.page.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../store/category/thunk';
import CustomDataGrid from '../../Components/CustomDataGrid/customDataGrid';

import CategoryModal from './CategoryModal';

const columns = [
  { field: 'categoryId', headerName: 'ID', width: 90 },
  {
    field: 'categoryCode',
    headerName: 'Category Code',
    width: 200,
    editable: false
  },
  {
    field: 'categoryName',
    headerName: 'Category Name',
    width: 250,
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

  const filteredData =
    categories && searchInput.length > 0
      ? categories.filter((item) => {
          return (
            item.categoryCode.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.categoryName.toLowerCase().includes(searchInput.toLowerCase())
          );
        })
      : categories;
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const [show, setShow] = useState(false);

  return (
    <div className="category">
      <div className="category-actions">
        <h2>Category</h2>
        <Button
          sx={{ width: 60, marginRight: '10px' }}
          onClick={() => setShow(true)}
          variant="contained">
          Add
        </Button>
        <TextField
          variant="standard"
          placeholder="Search Category....."
          name="searchInput"
          autoFocus="autoFocus"
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          sx={{ width: '250px' }}
        />
      </div>
      <CustomDataGrid
        categories={filteredData ? filteredData : []}
        columns={columns}
        isLoading={isLoading}
        error={error}
        width={550}
      />
      <CategoryModal show={show} isAdd={true} onClose={() => setShow(false)} />
    </div>
  );
}
