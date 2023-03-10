import * as yup from 'yup';

export const StockInItemSchema = yup.object().shape({
  randomId: yup.string(), //use for deletion. not saved in DB
  purchaseItemId: yup.number(),
  product: yup.object().shape({
    productId: yup
      .number()
      .typeError('Please select a product')
      .required('Please select a product'),
    productCode: yup.string(),
    productName: yup.string(),
    productDescription: yup.string(),
    category: yup.object().shape({
      categoryId: yup.string(),
      categoryName: yup.string()
    }),
    productPrice: yup.number()
  }),
  itemAmount: yup
    .number()
    .typeError('Invalid item amount.')
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    ),
  quantity: yup
    .number()
    .typeError('Invalid quantity.')
    .min(1, 'Invalid quantity')
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    ),
  itemTotalAmount: yup
    .number()
    .typeError('Invalid item total amount.')
    .test(
      'maxDigitsAfterDecimal',
      'Price must have only 2 digits after decimal or less',
      (number) => Number.isInteger(number * 10 ** 2)
    )
});

export const StockInFormSchema = yup.object().shape({
  purchaseId: yup.number(),
  supplierInvoiceNo: yup.string().required('Required'),
  batchCode: yup.string(),
  supplier: yup.object().shape({
    supplierId: yup
      .number()
      .typeError('Please select a supplier')
      .required('Please select a supplier'),
    supplierName: yup.string()
  }),
  purchaseDate: yup.date().typeError('Invalid Date').required('Required').default(new Date()),
  staff: yup.object().shape({
    userId: yup.number(),
    userName: yup.string()
  }),
  purchaseItems: yup.array().of(StockInItemSchema).min(1).required('At least 1 item is required'),
  totalAmount: yup.number(),
  created: yup.date(),
  remarks: yup.string()
});
