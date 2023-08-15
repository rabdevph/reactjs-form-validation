export const updateState = (setState, property, subProperty, value) => {
  setState((prevStatate) => {
    return {
      ...prevStatate,
      [property]: {
        ...prevStatate[property],
        [subProperty]: value,
      },
    };
  });
};

const validateInput = (inputType, value, options = {}) => {
  switch (inputType) {
    case 'username': {
      const usernamePattern = /^[A-Za-z0-9]{3,12}$/;
      return usernamePattern.test(value);
    }
    case 'email': {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    }
    case 'password': {
      const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z])(?!.*\s).{4,16}$/;
      return passwordPattern.test(value);
    }
    case 'confirmPassword': {
      if (options.password) {
        return value === options.password;
      }
      return false;
    }
    default:
      return false;
  }
};

export const isValidInput = (inputType, value, options = {}) => {
  return validateInput(inputType, value, options);
};
