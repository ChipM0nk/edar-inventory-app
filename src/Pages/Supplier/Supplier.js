// @ts-nocheck
import { IconButton, TextField } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/AddBoxSharp';
import RefreshIcon from '@mui/icons-material/ReplayCircleFilledSharp';
import { deleteSupplierThunk, getAllSuppliersThunk } from 'store/supplier/thunk';
import { useDispatch, useSelector } from 'react-redux';
import deleteIconButton from 'Components/Common/deleteIconButton';
import CustomDataGrid from 'Components/CustomDataGrid/customDataGrid';
import { NotificationManager } from 'react-notifications';
import SupplierModal from './SupplierModal';
import CustomDialog from 'Components/CustomDialog/customDialog';
import './supplier.page.css';

const initSchema = {
  supplierName: '',
  supplierAddress: '',
  supplierEmailAdd: '',
  supplierContactNumber: ''
};
export default function Supplier() {
  /**MUI Datagrid column def start */

  const columns = [
    { field: 'supplierId', headerName: 'ID', hide: true, width: 90 },
    {
      field: 'supplierName',
      headerName: 'Supplier Name',
      width: 200,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'supplierAddress',
      headerName: 'Supplier Address',
      width: 250,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'supplierEmailAdd',
      headerName: 'Email Address',
      width: 200,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'supplierContactNumber',
      headerName: 'Contact Number',
      width: 200,
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
  const { suppliers, isLoading, isProcessing, isSaved, isDeleted, error, crudError } = useSelector(
    (state) => state.supplier
  );
  /** Getting the state object end */

  /**Filtering start */
  const [searchInput, setSearchInput] = useState('');
  const filteredData =
    suppliers && searchInput.length > 0
      ? suppliers.filter((item) => {
          return item.supplierName.toLowerCase().includes(searchInput.toLowerCase());
        })
      : suppliers;
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };
  /**Filtering end */

  /**For Add/Update Modal start*/
  const [show, setShow] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  //supplier to update
  const [supplier, setSupplier] = useState({});

  //Update
  const onRowClick = useCallback((row) => {
    setSupplier(row);
    setIsAdd(false);
    setShow(true);
  });

  //add
  const onAddClick = () => {
    setShow(true);
    setIsAdd(true);
    setSupplier(initSchema);
  };

  useEffect(() => {
    if (!onLoad.current) {
      if (isSaved) {
        setShow(false);
        NotificationManager.info(`Supplier ${isAdd ? 'Saved' : 'Updated'}....`, 'Supplier', 3000);
      } else if (crudError) {
        NotificationManager.error(crudError, 'Supplier', 3000);
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
        NotificationManager.error(error, 'Supplier', 3000);
        onLoad.current = false;
      } else if (isDeleted && !isLoading) {
        setOpen(false);
        NotificationManager.info('Supplier Deleted.....', 'Supplier', 3000);
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
  const handleDeleteSupplier = async () => {
    dispatch(deleteSupplierThunk(catIdToDelete));
  };

  /*** Delete function end..... */
  /**For onload functions */
  const dispatch = useDispatch();
  const onLoad = useRef(true);
  useEffect(() => {
    dispatch(getAllSuppliersThunk());
    onLoad.current = false;
  }, [dispatch]);

  /**For onload end */
  return (
    <div className='="supplier'>
      <div className="supplier-actions">
        <h2>Suppliers</h2>
        <div>
          <IconButton onClick={onAddClick} variant="contained">
            <AddIcon fontSize="large" color="primary"></AddIcon>
          </IconButton>
          <IconButton onClick={() => dispatch(getAllSuppliersThunk())} variant="contained">
            <RefreshIcon fontSize="large" color="primary"></RefreshIcon>
          </IconButton>
        </div>
        <TextField
          variant="standard"
          placeholder="Search supplier....."
          name="searchInput"
          autoFocus
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          sx={{ width: '250px' }}
        />
      </div>
      <CustomDataGrid
        items={filteredData ? filteredData : []}
        itemId="supplierId"
        columns={columns}
        isLoading={isLoading}
        error={error}
        width={910}
        onRowClick={onRowClick}
      />
      <SupplierModal show={show} isAdd={isAdd} onClose={() => setShow(false)} supplier={supplier} />
      <CustomDialog
        title="Delete Supplier"
        message="Are you sure you want to delete this supplier?"
        open={open}
        error={false}
        initSchema={initSchema}
        onOkClick={handleDeleteSupplier}
        onClose={handleAlertClose}
        loading={isProcessing}
      />
    </div>
  );
}
