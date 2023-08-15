import { useState } from 'react';

import { FormInput } from './components/FormInput.jsx';

import { updateState, isValidInput } from './utils/utils.js';

import './app.css';

const defaulValues = {
  username: {
    val: '',
    isEmpty: false,
    isValid: true,
  },
  email: {
    val: '',
    isEmpty: false,
    isValid: true,
  },
  password: {
    val: '',
    isEmpty: false,
    isValid: true,
  },
  confirmPassword: {
    val: '',
    isEmpty: false,
    isValid: true,
  },
};

function App() {
  const [values, setValues] = useState(defaulValues);

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        'Username must be 3-12 characters and should not include any special character and white space.',
      label: 'USERNAME',
    },
    {
      id: 2,
      name: 'email',
      type: 'text',
      placeholder: 'Email Address',
      errorMessage: 'Invalid email address.',
      label: 'EMAIL ADDRESS',
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password must be 4-12 characters long with at least 1 number and 1 upper case letter.',
      label: 'PASSWORD',
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords do not match.',
      label: 'CONFIRM PASSWORD',
    },
  ];

  const checkEmptyInput = (value, property) => {
    if (value.trim() === '') {
      updateState(setValues, property, 'isEmpty', true);
    } else {
      updateState(setValues, property, 'isEmpty', false);
    }
  };

  const areAllInputsFilled = (values) => {
    return Object.values(values).every((value) => value.val !== '');
  };

  const checkValidInput = () => {
    if (!isValidInput('username', values.username.val)) {
      updateState(setValues, 'username', 'isValid', false);
    }

    if (!isValidInput('email', values.email.val)) {
      updateState(setValues, 'email', 'isValid', false);
    }

    if (!isValidInput('password', values.password.val)) {
      updateState(setValues, 'password', 'isValid', false);
    }

    if (
      !isValidInput('confirmPassword', values.confirmPassword.val, {
        password: values.password.val,
      })
    ) {
      updateState(setValues, 'confirmPassword', 'isValid', false);
    }
  };

  const areAllInputsValid = () => {
    return (
      isValidInput('username', values.username.val) &&
      isValidInput('email', values.email.val) &&
      isValidInput('password', values.password.val) &&
      isValidInput('confirmPassword', values.confirmPassword.val, { password: values.password.val })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (areAllInputsFilled(values) && areAllInputsValid()) {
      alert('Form submitted successfully.');
      e.target.reset();
      setValues(defaulValues);
    } else {
      console.log('Form not subimitted.');

      checkEmptyInput(values.username.val, 'username');
      checkEmptyInput(values.email.val, 'email');
      checkEmptyInput(values.password.val, 'password');

      checkValidInput();
    }
  };

  const handleChange = (e) => {
    updateState(setValues, e.target.name, 'val', e.target.value);
    updateState(setValues, e.target.name, 'isEmpty', false);
    updateState(setValues, e.target.name, 'isValid', true);
  };

  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-header">FORM VALIDATION</p>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            isEmpty={values[input.name].isEmpty}
            isValid={values[input.name].isValid}
            handleChange={handleChange}
          />
        ))}
        <input className="form-submit" type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

export default App;
