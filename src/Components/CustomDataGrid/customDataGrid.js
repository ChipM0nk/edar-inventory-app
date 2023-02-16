import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
export default function CustomDataGrid(props) {
  const filteredData =
    props.categories && props.searchInput.length > 0
      ? props.categories.filter((item) => {
          return (
            item.categoryCode.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            item.categoryName.toLowerCase().includes(props.searchInput.toLowerCase())
          );
        })
      : props.categories;

  return (
    <Box sx={{ height: 400, width: 800 }}>
      <DataGrid
        rows={filteredData ? filteredData : []}
        getRowId={(row) => row.categoryId}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        loading={props.isLoading}
        error={props.error}
      />
    </Box>
  );
}
