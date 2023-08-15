import { useState } from 'react';

import { FormInput } from './components/FormInput.jsx';

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

  const updateVal = (property, value) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [property]: {
          ...prevState[property],
          val: value,
        },
      };
    });
  };

  const updateIsEmpty = (property, bool) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [property]: {
          ...prevState[property],
          isEmpty: bool,
        },
      };
    });
  };

  const updateIsValid = (property, bool) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [property]: {
          ...prevState[property],
          isValid: bool,
        },
      };
    });
  };

  const checkEmptyInput = (value, property) => {
    if (value.trim() === '') {
      updateIsEmpty(property, true);
    } else {
      updateIsEmpty(property, false);
    }
  };

  const areAllInputsFilled = (values) => {
    return Object.values(values).every((value) => value.val !== '');
  };

  const isValidUsername = (username) => {
    const pattern = /^[A-Za-z0-9]{3,12}$/;
    return pattern.test(username);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const pattern = /^(?=.*[0-9])(?=.*[A-Z])(?!.*\s).{4,16}$/;
    return pattern.test(password);
  };

  const arePasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const checkValidInput = () => {
    if (!isValidUsername(values.username.val)) {
      updateIsValid('username', false);
    }

    if (!isValidEmail(values.email.val)) {
      updateIsValid('email', false);
    }

    if (!isValidPassword(values.password.val)) {
      updateIsValid('password', false);
    }

    if (!arePasswordsMatch(values.password.val, values.confirmPassword.val)) {
      updateIsValid('confirmPassword', false);
    }
  };

  const areAllInputsValid = () => {
    return (
      isValidUsername(values.username.val) &&
      isValidEmail(values.email.val) &&
      isValidPassword(values.password.val) &&
      arePasswordsMatch(values.password.val, values.confirmPassword.val)
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
    updateVal(e.target.name, e.target.value);
    updateIsEmpty(e.target.name, false);
    updateIsValid(e.target.name, true);
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
