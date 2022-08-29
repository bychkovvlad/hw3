import React from "react";

import classNames from "classnames";

import { Loader, LoaderSize } from "../Loader/Loader";
import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  color?: ButtonColor;
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export const Button: React.FC<ButtonProps> = ({
  color = ButtonColor.primary,
  loading = false,
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <>
      <button
        className={classNames(
          styles.button,
          styles[`button_color-${color}`],
          { button_disabled: loading || disabled },
          className
        )}
        color={`${color}`}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <Loader className={styles.loader_button} size={LoaderSize.s} />
        )}
        <div className={styles.button_children}>{children}</div>
      </button>
    </>
  );
};
