// @ts-nocheck
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
export default function deleteIconButton(onClick, params) {
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ cursor: 'pointer' }}>
      <IconButton color="secondary" aria-label="Delete Item" onClick={(e) => onClick(e, params)}>
        <DeleteIcon variant="outlined" style={{ color: '#8E1102' }} />
      </IconButton>
    </div>
  );
}
