import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';
import { InputHTMLAttributes } from 'react';

export type TextFieldProps = {
  label?: string;
  id: string;
  register: UseFormRegisterReturn;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  label,
  id,
  register,
  isDisabled = false,
  isRequired = false,
  placeholder,
  error,
  ...props
}: TextFieldProps) => {
  
  return (
    <label htmlFor={id} className={styles.wrapper}>
      <span className={styles.wrapper__label}>
        {label}
        <span className="font-semibold ml-0.5">{isRequired ? "*" : ""}</span>  
      </span>
      <input
        {...props}
        {...register}
        placeholder={placeholder}
        autoComplete="off"
        disabled={isDisabled}
        id={id}
        type="text"
        className={`
          ${styles.input} 
          ${isDisabled && styles.input_disabled}
          ${error && styles.input_errored}
        `}
      ></input>
      <span className={styles.wrapper__error}>{error}</span>
    </label>
  );
};

export { TextField };