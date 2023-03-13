/* eslint-disable no-unused-vars */
// @ts-nocheck
import CustomModal from 'Components/Modal/CustomModal';
import React, { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { addStockinThunk } from 'store/stockin/thunk';

export default function StockInFormReviewModal({ stockInFormData, columns, show, onClose }) {
  const isProcessing = useSelector((state) => state.stockin.isProcessing);
  const dispatch = useDispatch();

  return (
    <CustomModal title="Review Details" show={show} onClose={onClose} height={600} width={1200}>
      <MaterialReactTable
        renderTopToolbarCustomActions={() => (
          <div className="purchase-info-box">
            <span>
              <div>Supplier</div>
              <div>: {stockInFormData.supplier.supplierName}</div>
            </span>
            <span>
              <div>Supplier Invoice</div>
              <div>: {stockInFormData.supplierInvoiceNo}</div>
            </span>
            <span>
              <div>Purchase Date</div>
              <div>: {moment(stockInFormData.purchaseDate).format('DD-MMM-YYYY')}</div>
            </span>
            <span>
              <div>Remarks</div>
              <div>: {stockInFormData.remarks}</div>
            </span>
          </div>
        )}
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
        columns={columns.slice(1)}
        data={stockInFormData?.purchaseItems}
        initialState={{ density: 'compact' }}
        enablePagination={false}
        enableColumnActions={false}
        enableColumnOrdering={false}
        onEditingRowSave={() => {}}
        onEditingRowCancel={() => {}}
        enableFilters={false}
        enableHiding={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
            wordWrap: 'break-word'
          }
        }}
        renderBottomToolbarCustomActions={() => (
          <LoadingButton
            loading={isProcessing}
            sx={{ width: 120 }}
            onClick={() => dispatch(addStockinThunk(stockInFormData))}
            variant="contained">
            Submit
          </LoadingButton>
        )}
      />
    </CustomModal>
  );
}
