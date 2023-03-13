// @ts-nocheck
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuppliersThunk } from 'store/supplier/thunk';
import { LoadingButton } from '@mui/lab';
import MaterialReactTable from 'material-react-table';
import './stockinform.page.css';
import CustomDatePicker from 'Components/Common/customDatePicker';
import { StockInFormSchema } from './schema/schemas';
import { getAllProductsThunk } from 'store/product/thunk';
import AddStockinItemModal from './AddStockInItemModal';
import { Delete } from '@mui/icons-material';
import { CustomAutoComplete } from 'Components/Common/customAutoComplete';
import StockInFormReviewModal from './StockinFormReviewModal';
import { NotificationManager } from 'react-notifications';
export default function StockInForm() {
  /** MUI Daagrid column start */

  function uniqueID() {
    return Math.floor(Math.random() * Date.now());
  }
  const [validationErrors, setValidationErrors] = useState({});
  const columns = [
    {
      accessorKey: 'randomId',
      header: 'Action',
      size: 10,
      enableEditing: false,
      Cell: ({ renderedCellValue }) => (
        <Tooltip sx={{ width: 20, padding: 0 }} arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(renderedCellValue)}>
            <Delete />
          </IconButton>
        </Tooltip>
      )
    },
    {
      accessorKey: 'product.productCode',
      header: 'Product Code',
      size: 70,
      enableEditing: false
    },
    {
      accessorKey: 'product.productName',
      header: 'Product Name',
      size: 70,
      enableEditing: false
    },
    {
      accessorKey: 'product.productDescription',
      header: 'Product Description',
      size: 180,
      enableEditing: false,
      Cell: ({ renderedCellValue }) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            zIndex: 0
          }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      accessorKey: 'itemAmount',
      header: 'Amount',
      size: 60,
      enableEditing: true,
      muiTableBodyCellEditTextFieldProps: {
        error: !!validationErrors.age, //highlight mui text field red error color
        helperText: validationErrors.age, //show error message in helper text.
        required: true,
        type: 'number',
        onChange: (event) => {
          const value = event.target.value;
          //validation logic
          if (!value) {
            setValidationErrors((prev) => ({ ...prev, age: 'Amount is required' }));
          } else if (value < 0) {
            setValidationErrors({
              ...validationErrors,
              age: 'Invalid Amount'
            });
          } else {
            delete validationErrors.age;
            setValidationErrors({ ...validationErrors });
          }
        }
      }
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      size: 60,
      enableEditing: true,
      muiTableBodyCellEditTextFieldProps: {
        error: !!validationErrors.age, //highlight mui text field red error color
        helperText: validationErrors.age, //show error message in helper text.
        required: true,
        type: 'number',
        onChange: (event) => {
          const value = event.target.value;
          //validation logic
          if (!value) {
            setValidationErrors((prev) => ({ ...prev, age: 'Quantity is required' }));
          } else if (value < 0) {
            setValidationErrors({
              ...validationErrors,
              age: 'Invalid Quantity'
            });
          } else {
            delete validationErrors.age;
            setValidationErrors({ ...validationErrors });
          }
        }
      }
    },
    {
      accessorKey: 'itemTotalAmount',
      header: 'Total',
      size: 60,
      enableEditing: false
    }
  ];

  /** MUI Daagrid column end */

  /** Const start */
  const [stockinItems, setStockinItems] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [stockinFormData, setStockinFormData] = useState({});

  const { suppliers } = useSelector((state) => state.supplier);
  const { products } = useSelector((state) => state.product);
  const { isSaved, crudError } = useSelector((state) => state.stockin);

  /** Const end */

  /**Form definition start */

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(StockInFormSchema)
  });

  const onInvalid = (errors) => {
    console.error(errors);
  };

  const onSubmit = (data) => {
    console.log(`Data is:: ${JSON.stringify(data)}`);
    setShowReviewModal(true);
    setStockinFormData(data);
  };
  /**Form definition end */

  /** On save start */
  useEffect(() => {
    if (!onLoad.current) {
      if (isSaved) {
        setShowReviewModal(false);
        NotificationManager.info('Stockin is saved', 'Stock In', 3000);
      } else if (crudError) {
        NotificationManager.error(crudError, 'Product', 3000);
      }
    }
  }, [isSaved, crudError]);
  /** On save end */
  /** On Load start */

  const dispatch = useDispatch();
  const onLoad = useRef(true);

  useEffect(() => {
    dispatch(getAllSuppliersThunk());
    dispatch(getAllProductsThunk());
    onLoad.current = false;

    //temp
    setValue('purchaseItems', stockinItems);
    setStockinItems(stockinItems);
  }, [dispatch]);

  /** On Load end */

  /** On cell edit start */

  const handleSaveCell = (cell, value) => {
    stockinItems[cell.row.index][cell.column.id] = value;
    stockinItems[cell.row.index]['itemTotalAmount'] =
      stockinItems[cell.row.index]['quantity'] * stockinItems[cell.row.index]['itemAmount'];

    const newItems = [...stockinItems];

    setStockinItems(newItems);
    setValue('purchaseItems', newItems);
  };

  /** On cell edit end */

  /** Add Item Modal actions start */

  function onAddItem(itemToAdd) {
    const newStockinItems = [...stockinItems, { ...itemToAdd, randomId: uniqueID() }];
    setStockinItems(newStockinItems);
    setValue('purchaseItems', newStockinItems);
  }

  /**  Add Item  actions end */

  /** Others start */

  function onSupplierChange(supplier) {
    const filteredProducts = supplier
      ? products.filter((product) => product.supplier.supplierId === supplier.supplierId)
      : [];

    setFilteredProducts(filteredProducts);
    setStockinItems([]); //reset
  }

  function handleDeleteRow(randomId) {
    const newStockinItems = stockinItems.filter((i) => i.randomId != randomId);
    setStockinItems(newStockinItems);
    setValue('purchaseItems', newStockinItems);
  }

  function onAddClick() {
    setShow(true);
  }

  useEffect(() => {
    let totalPurchaseAmount = 0;

    stockinItems.forEach((el) => {
      totalPurchaseAmount += el.itemTotalAmount;
    });

    setValue('totalAmount', totalPurchaseAmount);
  }, [stockinItems]);
  /** Others end */

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="stock-in-form">
          <CustomAutoComplete
            options={suppliers}
            sx={{ width: 250 }}
            control={control}
            onChange={onSupplierChange}
            name="supplier"
            placeholder="Select Supplier"
            optionId="supplierId"
            optionLabel="supplierName"
          />
          <TextField
            variant="outlined"
            error={errors.supplierInvoiceNo ? true : false}
            label="Supplier Invoice No."
            size="small"
            {...register('supplierInvoiceNo')}
            sx={{ width: 250 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.supplierInvoiceNo && errors.supplierInvoiceNo.message}
          />

          <CustomDatePicker control={control} name="purchaseDate" label="Purchase Date" />

          <TextField
            variant="outlined"
            error={errors.remarks ? true : false}
            label="Remarks"
            size="small"
            {...register('remarks')}
            // sx={{ width: 766 }}
            fullWidth
            inputProps={{ maxLength: 50 }}
            helperText={errors.remarks && errors.remarks.message}
          />
        </div>

        <MaterialReactTable
          enableEditing
          enableStickyHeader
          enableSorting={false}
          muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
          columns={columns}
          data={stockinItems}
          editingMode="cell"
          enablePagination={false}
          enableColumnActions={false}
          enableTopToolbar={false}
          enableColumnOrdering={false}
          onEditingRowSave={() => {}}
          onEditingRowCancel={() => {}}
          initialState={{ density: 'compact' }}
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
              wordWrap: 'break-word'
            }
          }}
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onBlur: (event) => {
              console.log(Number.parseFloat(event.target.value * 10 ** 2).toFixed(2));
              console.log(event.target.value * 10 ** 2);
              if (!Number.isInteger(event.target.value * 10 ** 2) || event.target.value < 1) {
                alert('Invalid value!');
                return;
              }
              handleSaveCell(cell, event.target.value);
            }
          })}
          renderBottomToolbarCustomActions={() => (
            <div>
              <Button
                disabled={filteredProducts.length === 0 ? true : false}
                sx={{ width: 120 }}
                onClick={onAddClick}
                variant="contained">
                Add Item
              </Button>
            </div>
          )}
        />

        <LoadingButton
          className="modal-button"
          variant="contained"
          type="submit"
          loading={false}
          sx={{ width: 120, margin: '15px 10px' }}
          disabled={!isDirty || (stockinItems.length === 0 ? true : false)}>
          REVIEW
        </LoadingButton>
      </form>
      <AddStockinItemModal
        show={show}
        onAddItem={onAddItem}
        filteredProducts={filteredProducts}
        onClose={() => setShow(false)}
      />
      <StockInFormReviewModal
        stockInFormData={stockinFormData}
        show={showReviewModal}
        columns={columns}
        onClose={() => setShowReviewModal(false)}
      />
    </div>
  );
}
