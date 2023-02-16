export const stateSchema = {
  categoryId: { value: '', error: '' },
  categoryCode: { value: '', error: '' },
  categoryName: { value: '', error: '' }
};

export const stateValidatorSchema = {
  categoryCode: {
    required: true,
    validator: {
      func: (value) => /^.{1,50}$/.test(value),
      error: ''
    }
  },
  categoryName: {
    required: true,
    validator: {
      func: (value) => /^[0-9]{3}$/.test(value),
      error: 'Please enter 3 digit code'
    }
  }
};
