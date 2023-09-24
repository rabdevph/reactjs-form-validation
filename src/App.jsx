import { useState } from 'react';

import Form from './components/Form.jsx';
import Field from './components/Field.jsx';
import Submit from './components/Submit.jsx';

// Initial form field values
const initialValues = {
  email: '',
  password: '',
};

// Define form fields with properties
const fields = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter email address',
    label: 'EMAIL ADDRESS',
    sibling: false,
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    label: 'PASSWORD',
    sibling: true,
  },
];

// Define submit button properties
const submitButton = { type: 'submit', value: 'SUBMIT' };

// Validation function to check field errors
const validate = (values) => {
  const errors = {};

  // Email field validation
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Password field validation
  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  return errors;
};

const App = () => {
  // State for form field values and errors
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle input field blur events (validation)
  const handleBlur = (event) => {
    const { name } = event.target;
    const fieldError = validate(values)[name];
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const fieldErrors = validate(values);
    setErrors(fieldErrors);

    const formHasErrors = Object.keys(fieldErrors).some((key) => fieldErrors[key] !== '');

    if (!formHasErrors) {
      console.log('Form submitted:', values);
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <div className="bg-emerald-300 flex flex-col items-center justify-center font-mono gap-8 min-h-svh p-8">
      <p className="font-bold">REACT JS FORM VALIDATION</p>
      <Form handleSubmit={handleSubmit}>
        <h3 className="font-bold text-2xl">Register</h3>
        {fields.map((field) => {
          return (
            <Field
              key={field.id}
              {...field}
              error={errors[field.name]}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          );
        })}
        <Submit {...submitButton} />
      </Form>
    </div>
  );
};

export default App;
