import React, { useId } from 'react';
import './Input.css';

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      multiline = false,
      readOnly = false,
      className = "",
      style = {},
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={`input-container ${className}`}>
        {label && (
          <label htmlFor={id} className="label">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            className="input-field multiline-field"
            style={style}
            id={id}
            ref={ref}
            readOnly={readOnly}
            {...props}
          />
        ) : (
          <input
            className="input-field"
            style={style} 
            type={type}
            id={id}
            ref={ref}
            readOnly={readOnly}
            {...props}
          />
        )}
      </div>
    );
  }
);

export default Input;