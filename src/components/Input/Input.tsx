import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
};

export const Input: React.FC<InputProps> = ({
  value = "",
  className,
  type,
  disabled,
  ...props
}) => {
  return (
    <input
      value={value}
      className={classNames(className, styles.input_form, {
        input_disabled: disabled,
      })}
      disabled={disabled}
      type="text"
      {...props}
    />
  );
};
