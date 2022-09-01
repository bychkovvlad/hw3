import React, { useCallback } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value?: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  className,
  type,
  disabled,
  ...props
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <input
      value={value}
      onChange={handleChange}
      className={classNames(className, styles.input_form, {
        input_disabled: disabled,
      })}
      disabled={disabled}
      type="text"
      {...props}
    />
  );
};
