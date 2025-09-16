import React from 'react';
import './Button.css';

const Button = ({
  children,
  type = "button",
  ...props
}) => {
  return (
    <div className="button-container">
      <button type={type} className="button" {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;