import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
export default function CustomDataGrid(props) {
  const [ps, setPs] = useState(10);
  return (
    <Box sx={{ height: 550, width: 800, color: '#153d02' }}>
      <DataGrid
        rows={props.items}
        getRowId={(row) => row[props.itemId]}
        columns={props.columns}
        pageSize={ps}
        onPageSizeChange={(newPageSize) => setPs(newPageSize)}
        rowHeight={40}
        rowsPerPageOptions={[10, 20, 30]}
        disableSelectionOnClick
        pagination
        loading={props.isLoading}
        error={props.error}
        sx={{
          width: props.width,
          borderColor: '#153d02',
          '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
            display: 'none'
          }
        }}
        onRowClick={(item) => props.onRowClick(item.row)}
      />
    </Box>
  );
}
