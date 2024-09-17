import React from "react";
import InputMask from "react-input-mask";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={`text-black h-10 w-64 rounded-md 
          text-sm border border-white ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

const InputPhone = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, type, ...props }, ref) => {
    return (
      <InputMask
        type={type}
        mask="(99) 9 9999-9999"
        placeholder={placeholder}
        className={`text-black h-10 w-64 rounded-md 
        text-sm border border-white ${className}`}
        {...props}
      />
    );
  }
);

InputPhone.displayName = "Input";

export { InputPhone };
