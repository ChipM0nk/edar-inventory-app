import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
export default function CustomDataGrid(props) {
  return (
    <Box sx={{ height: 550, width: 800, color: '#153d02' }}>
      <DataGrid
        rows={props.categories}
        getRowId={(row) => row.categoryId}
        columns={props.columns}
        pageSize={10}
        rowHeight={40}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        loading={props.isLoading}
        error={props.error}
        sx={{ width: props.width, borderColor: '#153d02' }}
      />
    </Box>
  );
}
