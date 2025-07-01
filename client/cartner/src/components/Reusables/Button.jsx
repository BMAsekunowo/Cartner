import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Button.css';

const Button = ({ children, onClick, size = 'md', type = 'button', disabled = false }) => {
  return (
    <button
      className={`submit-btn ${size}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;