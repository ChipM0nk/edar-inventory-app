export const stateSchema = {
  username: { value: '', error: '' },
  password: { value: '', error: '' }
};

export const stateValidatorSchema = {
  username: {
    required: true,
    validator: {
      func: (value) => /^[a-zA-Z]+$/.test(value),
      error: ''
    }
  },
  password: {
    required: true,
    validator: {
      func: (value) => /^[a-zA-Z0-9]+$/.test(value),
      error: ''
    }
  }
};
