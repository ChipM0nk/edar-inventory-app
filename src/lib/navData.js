import React from 'react';

import {
  CategoryRounded,
  Home,
  PointOfSale,
  ShoppingBasket,
  ShoppingCart,
  ShopTwo
} from '@mui/icons-material';
export const navData = [
  {
    id: 0,
    icon: <Home style={{ color: 'white' }} />,
    name: 'Home',
    text: 'Home',
    link: '/home'
  },
  {
    id: 0,
    icon: <PointOfSale />,
    name: 'InvoiceForm',
    text: 'Invoice Form',
    link: '/'
  },
  {
    id: 1,
    icon: <ShoppingBasket />,
    name: 'PurchaseForm',
    text: 'Stock In Form',
    link: 'stockinform'
  },
  {
    id: 2,
    icon: <ShopTwo />,
    name: 'Invoices',
    text: 'Invoices',
    link: 'invoices'
  },
  {
    id: 3,
    icon: <ShoppingCart />,
    name: 'Purchases',
    text: 'Stock Ins',
    link: 'stockins'
  },
  {
    id: 4,
    icon: <CategoryRounded />,
    name: 'Category',
    text: 'Category',
    link: 'category'
  }
];
