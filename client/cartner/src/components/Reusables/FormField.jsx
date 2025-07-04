import React from "react";
import PropTypes from "prop-types";
import "../../styles/FormField.css";

const FormField = ({
  label,
  name,
  value,
  onChange,
  fieldType = "input",
  type = "text",
  placeholder,
  options = [],
  size = "md",
  required = false,
  ...props
}) => {
  const renderField = () => {
    switch (fieldType) {
      case "textarea":
        return (
          <textarea
            className={`formflex-input ${size}`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            {...props}
          />
        );
      case "select":
        return (
          <select
            className={`formflex-input ${size}`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          >
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="radio-group">
            {options.map((opt, i) => (
              <label key={i} className="radio-option">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  required={required}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <input
            className={`formflex-input ${size}`}
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            onChange={onChange}
            {...props}
          />
        );
      case "file":
        return (
          <input
            className={`formflex-input ${size}`}
            type="file"
            id={name}
            name={name}
            onChange={onChange}
            required={required}
            {...props}
          />
        );
      default:
        return (
          <input
            className={`formflex-input ${size}`}
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`formflex-group ${size}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {renderField()}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  fieldType: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  required: PropTypes.bool,
};

export default FormField;