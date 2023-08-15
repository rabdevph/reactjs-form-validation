import { useState } from 'react';
import './formInput.css';

export const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { id, label, errorMessage, handleChange, isEmpty, isValid, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="input">
      <div className="input-top-section">
        <label className="input-label">{label}</label>
        <span className={`input-empty ${isEmpty ? 'empty' : ''}`}>*required</span>
      </div>
      <input
        className={`input-field ${focused ? 'focused' : ''} ${isEmpty ? 'empty' : ''}
        ${isValid ? '' : 'invalid'}`}
        autoComplete="off"
        {...inputProps}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-focused={focused.toString()}
      />
      <span className={`input-invalid ${isValid ? '' : 'invalid'}`}>{errorMessage}</span>
    </div>
  );
};
