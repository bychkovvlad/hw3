import React from "react";

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
  return (
    <input
      value={value}
      onChange={(el) => {
        onChange(el.target.value);
      }}
      className={classNames(className, styles.input_form, {
        input_disabled: disabled,
      })}
      disabled={disabled}
      type="text"
      {...props}
    />
  );
};
