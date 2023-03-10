// @ts-nocheck
import { IconButton, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './category.page.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryThunk, getAllCategoriesThunk } from '../../store/category/thunk';
import CustomDataGrid from '../../Components/CustomDataGrid/customDataGrid';
import AddIcon from '@mui/icons-material/AddBoxSharp';
import RefreshIcon from '@mui/icons-material/ReplayCircleFilledSharp';
import CategoryModal from './CategoryModal';
import CustomDialog from 'Components/CustomDialog/customDialog';
import { NotificationManager } from 'react-notifications';
import deleteIconButton from 'Components/Common/deleteIconButton';

const initSchema = { categoryCode: '', categoryName: '' };

export default function Category() {
  /**MUI Datagrid column def start */

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
      renderCell: (params) => deleteIconButton(deleteOnClick, params)
    }
  ];

  /**MUI Datagrid column def end */

  /** Getting the state object start */
  const { categories, isLoading, isProcessing, isSaved, isDeleted, error, crudError } = useSelector(
    (state) => state.category
  );
  /** Getting the state object end */

  /**Filtering start */
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
  /**Filtering end */

  /**For Add/Update Modal start*/
  const [show, setShow] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  //category to update
  const [category, setCategory] = useState({});

  //Update
  const onRowClick = useCallback((row) => {
    setCategory(row);
    setIsAdd(false);
    setShow(true);
  });

  //add
  const onAddClick = () => {
    setShow(true);
    setIsAdd(true);
    setCategory(initSchema);
  };

  useEffect(() => {
    console.log(`Crud Error: ${crudError}`);
    if (!onLoad.current) {
      if (isSaved) {
        setShow(false);
        NotificationManager.info(`Category ${isAdd ? 'Saved' : 'Updated'}....`, 'Category', 3000);
      } else if (crudError) {
        NotificationManager.error(crudError, 'Category', 3000);
      }
    }
  }, [isSaved, crudError]);

  /**For Add/Update Modal end*/

  /*** Delete function start..... */

  function deleteOnClick(event, params) {
    console.log(params);
    setCatIdToDelete(params.id);
    setOpen(true);
    event.stopPropagation();
  }

  useEffect(() => {
    if (!onLoad.current) {
      if (error && !isProcessing) {
        NotificationManager.error(error, 'Category', 3000);
        onLoad.current = false;
      } else if (isDeleted && !isLoading) {
        setOpen(false);
        NotificationManager.info('Category Deleted.....', 'Category', 3000);
      }
    }
  }, [isProcessing, error, isDeleted]);

  const [open, setOpen] = React.useState(false);
  const handleAlertClose = () => {
    setOpen(false);
    setCatIdToDelete(null);
  };
  //workaround for nows
  const [catIdToDelete, setCatIdToDelete] = useState(null);
  const handleDeleteCategory = async () => {
    dispatch(deleteCategoryThunk(catIdToDelete));
  };

  /*** Delete function end..... */

  /**For onload functions */
  const dispatch = useDispatch();
  const onLoad = useRef(true);
  useEffect(() => {
    dispatch(getAllCategoriesThunk());
    onLoad.current = false;
  }, [dispatch]);

  /**For onload end */
  return (
    <div className="category">
      <div className="category-actions">
        <h2>Category</h2>
        <div>
          <IconButton onClick={onAddClick} variant="contained">
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
          autoFocus
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          sx={{ width: '250px' }}
        />
      </div>
      <CustomDataGrid
        items={filteredData ? filteredData : []}
        itemId="categoryId"
        columns={columns}
        isLoading={isLoading}
        error={error}
        width={550}
        onRowClick={onRowClick}
      />
      <CategoryModal show={show} isAdd={isAdd} onClose={() => setShow(false)} category={category} />
      <CustomDialog
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        open={open}
        error={false}
        initSchema={initSchema}
        onOkClick={handleDeleteCategory}
        onClose={handleAlertClose}
        loading={isProcessing}
      />
    </div>
  );
}
