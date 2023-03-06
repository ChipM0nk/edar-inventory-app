import CustomModal from 'Components/Modal/CustomModal';
import React from 'react';

export default function AddStockinItemModal({ show, handleClose, supplierId }) {
  return (
    <CustomModal title="Add Item" show={show} onClose={handleClose} height={550} width={700}>
      <form></form>
    </CustomModal>
  );
}
