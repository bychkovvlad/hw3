import React from "react";

import classnames from "classnames";

import styles from "./Loader.module.scss";
import { ReactComponent as ReactLogo } from "./Loader.svg";

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      className={classnames(`loader_size-${size}`, className, styles.loader)}
    >
      <ReactLogo />
    </div>
  );
};
