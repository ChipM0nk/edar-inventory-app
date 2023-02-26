// @ts-nocheck
import { IconButton, TextField, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/AddBoxSharp';
import RefreshIcon from '@mui/icons-material/ReplayCircleFilledSharp';
import { deleteProductThunk, getAllProductsThunk } from 'store/product/thunk';
import { useDispatch, useSelector } from 'react-redux';
import deleteIconButton from 'Components/Common/deleteIconButton';
import CustomDataGrid from 'Components/CustomDataGrid/customDataGrid';
import { NotificationManager } from 'react-notifications';
import ProductModal from './ProductModal';
import CustomDialog from 'Components/CustomDialog/customDialog';
import './product.page.css';

const initSchema = {
  productName: '',
  productAddress: '',
  productEmailAdd: '',
  productContactNumber: ''
};
export default function Product() {
  /**MUI Datagrid column def start */

  const columns = [
    { field: 'productId', headerName: 'ID', hide: true, width: 90 },
    {
      field: 'productCode',
      headerName: 'Product Code',
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      width: 200,
      editable: false,
      headerClassName: 'hideRightSeparator',
      renderCell: (param) => (
        <Tooltip
          title={
            <div>
              Description:
              <br />
              <br />
              {param.row.productDescription}
            </div>
          }>
          <span className="table-cell-trucate">{param.row.productName}</span>
        </Tooltip>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      valueFormatter: ({ value }) => value.categoryName,
      width: 150,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'productPrice',
      headerName: 'Price',
      width: 120,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'currentStock',
      headerName: 'QTY',
      width: 75,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'unit',
      headerName: 'Unit',
      width: 75,
      editable: false,
      headerClassName: 'hideRightSeparator'
    },
    {
      field: 'supplier',
      headerName: 'Supplier',
      valueFormatter: ({ value }) => value.supplierName,
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
  const { products, isLoading, isProcessing, isSaved, isDeleted, error, crudError } = useSelector(
    (state) => state.product
  );
  /** Getting the state object end */

  /**Filtering start */
  const [searchInput, setSearchInput] = useState('');
  const filteredData =
    products && searchInput.length > 0
      ? products.filter((item) => {
          return (
            item.productName.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.productDescription.toLowerCase().includes(searchInput.toLowerCase())
          );
        })
      : products;
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };
  /**Filtering end */

  /**For Add/Update Modal start*/
  const [show, setShow] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  //product to update
  const [product, setProduct] = useState({});

  //Update
  const onRowClick = useCallback((row) => {
    setProduct(row);
    setIsAdd(false);
    setShow(true);
  });

  //add
  const onAddClick = () => {
    setShow(true);
    setIsAdd(true);
    setProduct(initSchema);
  };

  useEffect(() => {
    if (!onLoad.current) {
      if (isSaved) {
        setShow(false);
        NotificationManager.info(`Product ${isAdd ? 'Saved' : 'Updated'}....`, 'Product', 3000);
      } else if (crudError) {
        NotificationManager.error(crudError, 'Product', 3000);
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
        NotificationManager.error(error, 'Product', 3000);
        onLoad.current = false;
      } else if (isDeleted && !isLoading) {
        setOpen(false);
        NotificationManager.info('Product Deleted.....', 'Product', 3000);
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
  const handleDeleteProduct = async () => {
    dispatch(deleteProductThunk(catIdToDelete));
  };

  /*** Delete function end..... */
  /**For onload functions */
  const dispatch = useDispatch();
  const onLoad = useRef(true);
  useEffect(() => {
    dispatch(getAllProductsThunk());
    onLoad.current = false;
  }, [dispatch]);

  /**For onload end */
  return (
    <div className='="product'>
      <div className="product-actions">
        <h2>Products</h2>
        <div>
          <IconButton onClick={onAddClick} variant="contained">
            <AddIcon fontSize="large" color="primary"></AddIcon>
          </IconButton>
          <IconButton onClick={() => dispatch(getAllProductsThunk())} variant="contained">
            <RefreshIcon fontSize="large" color="primary"></RefreshIcon>
          </IconButton>
        </div>
        <TextField
          variant="standard"
          placeholder="Search product....."
          name="searchInput"
          autoFocus
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          sx={{ width: '250px' }}
        />
      </div>
      <CustomDataGrid
        items={filteredData ? filteredData : []}
        itemId="productId"
        columns={columns}
        isLoading={isLoading}
        error={error}
        width={1030}
        onRowClick={onRowClick}
      />
      <ProductModal show={show} isAdd={isAdd} onClose={() => setShow(false)} product={product} />
      <CustomDialog
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        open={open}
        error={false}
        initSchema={initSchema}
        onOkClick={handleDeleteProduct}
        onClose={handleAlertClose}
        loading={isProcessing}
      />
    </div>
  );
}
