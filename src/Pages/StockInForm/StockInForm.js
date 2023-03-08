/* eslint-disable no-unused-vars */
// @ts-nocheck
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuppliersThunk } from 'store/supplier/thunk';
import { CustomAutoComplete } from 'Components/Common/customAutoComplete';
import { DatePicker, DatePickerToolbar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';
import hash from 'object-hash';
import MaterialReactTable, { MRT_Cell, MRT_ColumnDef } from 'material-react-table';
import './stockinform.page.css';
import CustomDatePicker from 'Components/Common/customDatePicker';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/AddBoxSharp';
import { StockInFormSchema } from './schema/schemas';
import { getAllProductsThunk } from 'store/product/thunk';
import AddStockinItemModal from './AddStockInItemModal';

export default function StockInForm() {
  /** MUI Daagrid column start */

  const columns = [
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
      enableEditing: true
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      size: 60,
      enableEditing: true
    },
    {
      accessorKey: 'itemTotalAmount',
      header: 'Total',
      size: 60,
      enableEditing: false
    }
  ];

  /** MUI Daagrid column end */

  /**Form definition start */
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(StockInFormSchema)
  });

  const onInvalid = (errors) => console.error(errors);

  const onSubmit = (data) => {
    console.log(`Data is:: ${JSON.stringify(data)}`);
  };
  /**Form definition end */

  /** On Load start */

  //temporary
  const [stockinItems, setStockinItems] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [show, setShow] = useState(false);
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

  const { suppliers } = useSelector((state) => state.supplier);
  const { products } = useSelector((state) => state.product);

  /** On Load end */

  /** On cell edit start */

  const handleSaveCell = (cell, value) => {
    stockinItems[cell.row.index][cell.column.id] = value;
    stockinItems[cell.row.index]['itemTotalAmount'] =
      stockinItems[cell.row.index]['quantity'] * stockinItems[cell.row.index]['itemAmount'];

    const newItems = [...stockinItems];

    setStockinItems(newItems);
  };

  /** On cell edit end */

  /** Action start */
  function onAddClick() {
    setShow(true);
  }
  /** Action end */

  /** Others start */

  function onSupplierChange(supplier) {
    // console.log(supplier);
    const filteredProducts = supplier
      ? products.filter((product) => product.supplier.supplierId === supplier.supplierId)
      : [];

    setFilteredProducts(filteredProducts);
    //temp
    setStockinItems([]); //reset
  }

  /** Others end */

  /** Modal actions start */

  function onAddItem(itemToAdd) {
    const newStockinItem = [...stockinItems, itemToAdd];
    setStockinItems(newStockinItem);
  }

  /** Modal actions end */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="stock-in-form">
          <CustomAutoComplete
            options={suppliers}
            sx={{ width: 250 }}
            control={control}
            onChange={onSupplierChange}
            name="supplier.supplierId"
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
            sx={{ width: 300 }}
            inputProps={{ maxLength: 50 }}
            helperText={errors.remarks && errors.remarks.message}
          />
        </div>

        <MaterialReactTable
          columns={columns}
          data={stockinItems}
          editingMode="cell"
          enableEditing
          enablePagination={false}
          enableColumnActions={false}
          enableTopToolbar={false}
          // enableBottomToolbar={false}
          enableColumnOrdering={false}
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
              wordWrap: 'break-word'
            }
          }}
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onBlur: (event) => {
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
          disabled={!isDirty}>
          SUBMIT
        </LoadingButton>
      </form>
      <AddStockinItemModal
        show={show}
        onAddItem={onAddItem}
        filteredProducts={filteredProducts}
        onClose={() => setShow(false)}
      />
    </div>
  );
}
