import * as yup from 'yup';

const CategorySchema = yup.object().shape({
  categoryCode: yup
    .string()
    .required('Category Code is required')
    .matches(/^[a-zA-Z0-9]{3,6}$/, 'Please input 3-6 alphanumeric characters'),
  categoryName: yup
    .string()
    .required('Category Name is required')
    .matches(/^[a-zA-Z0-9///" ]{3,50}$/, 'Please input 3-50 alphanumeric characters')
});

export default CategorySchema;
