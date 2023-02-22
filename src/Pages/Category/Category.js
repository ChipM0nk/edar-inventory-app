// @ts-nocheck
import { IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './category.page.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryThunk, getAllCategoriesThunk } from '../../store/category/thunk';
import CustomDataGrid from '../../Components/CustomDataGrid/customDataGrid';
import AddIcon from '@mui/icons-material/AddBoxSharp';
import RefreshIcon from '@mui/icons-material/ReplayCircleFilledSharp';
import CategoryModal from './CategoryModal';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import CustomDialog from 'Components/CustomDialog/customDialog';
import { NotificationManager } from 'react-notifications';

export default function Category() {
  const columns = [
    { field: 'categoryId', headerName: 'ID', hide: true, width: 90 },
    {
      field: 'categoryCode',
      headerName: 'Category Code',
      width: 180,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'categoryName',
      headerName: 'Category Name',
      width: 290,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 20,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      headerClassName: 'hideRightSeparator',
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={() => {
                setCatIdToDelete(params.row.categoryId);
                setOpen(true);
              }}>
              <DeleteIcon variant="outlined" style={{ color: '#8E1102' }} />
            </IconButton>
          </div>
        );
      }
    }
  ];

  const dispatch = useDispatch();

  const { categories, isLoading, isProcessing, isDeleted, error } = useSelector((state) => ({
    categories: state.category.data,
    isLoading: state.category.loading,
    isProcessing: state.category.processing,
    isDeleted: state.category.isDeleted,
    error: state.category.error
  }));

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      setOpen(false);
      NotificationManager.info('Category Deleted.....', 'Category', 3000);
    } else if (error && !isProcessing) {
      NotificationManager.error(error, 'Category', 3000);
    }
  }, [isProcessing, isDeleted, error]);

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

  const [open, setOpen] = React.useState(false);
  const handleAlertClose = () => {
    setOpen(false);
    setCatIdToDelete(null);
  };

  //workaround for nows
  const [catIdToDelete, setCatIdToDelete] = useState(null);
  const handleDeleteCategory = async () => {
    console.log(`Category Id :::: ${catIdToDelete}`);
    dispatch(deleteCategoryThunk(catIdToDelete));
  };

  return (
    <div className="category">
      <div className="category-actions">
        <h2>Category</h2>
        <div>
          <IconButton onClick={() => setShow(true)} variant="contained">
            <AddIcon fontSize="large" color="primary"></AddIcon>
          </IconButton>
          <IconButton onClick={() => dispatch(getAllCategoriesThunk())} variant="contained">
            <RefreshIcon fontSize="large" color="primary"></RefreshIcon>
          </IconButton>
        </div>
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
      <CustomDialog
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        open={open}
        error={false}
        onOkClick={handleDeleteCategory}
        onClose={handleAlertClose}
        loading={isProcessing}
      />
    </div>
  );
}
