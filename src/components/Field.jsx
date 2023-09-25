import { useState } from 'react';
import visible from '../assets/images/visibility_on.svg';
import invisible from '../assets/images/visibility_off.svg';

const Field = ({ error, handleChange, handleBlur, ...field }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Toggle password visibility
  const handleTogglePassword = () => {
    setIsInputVisible((state) => !state);
  };

  // Handle field focus event
  const handleFieldFocus = () => {
    setIsFocused(true);
  };

  // Handle field blur events and invoke validation
  const handleFieldBlur = (event) => {
    setIsFocused(false);
    handleBlur(event);
  };

  // Handle key down event - enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsFocused(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field.id} className="text-xs">
        {field.label}
      </label>
      <div
        className={`border-2 ${
          error && !isFocused ? 'border-red-600' : 'border-black'
        } flex gap-1 p-2`}
      >
        <input
          id={field.id}
          name={field.name}
          type={isInputVisible ? 'text' : field.type}
          placeholder={field.placeholder}
          autoComplete="off"
          className={`bg-transparent w-full outline-none text-base placeholder:text-slate-400`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
        />
        {field.sibling ? (
          <button type="button" onClick={handleTogglePassword} className="border-none outline-none">
            <img src={isInputVisible ? invisible : visible} alt="" className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      {error && !isFocused ? <span className="text-red-600 text-xs">{error}</span> : null}
    </div>
  );
};

export default Field;
