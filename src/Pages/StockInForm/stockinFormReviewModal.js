import CustomModal from 'Components/Modal/CustomModal';
import React from 'react';
import MaterialReactTable from 'material-react-table';
import { LoadingButton } from '@mui/lab';

export default function StockInFormReviewModal({ stockInFormData, columns, show, onClose }) {
  console.log(stockInFormData.supplier);
  return (
    <CustomModal title="Review Details" show={show} onClose={onClose} height={600} width={1200}>
      <MaterialReactTable
        renderTopToolbarCustomActions={() => <div>{stockInFormData.supplier.supplierName}</div>}
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
        enableDensityToggle={false}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
            wordWrap: 'break-word'
          }
        }}
        renderBottomToolbarCustomActions={() => (
          <LoadingButton sx={{ width: 120 }} onClick={() => {}} variant="contained">
            Submit
          </LoadingButton>
        )}
      />
    </CustomModal>
  );
}
