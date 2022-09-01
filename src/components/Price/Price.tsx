import React from "react";

import styles from "./Price.module.scss";

type PriceProps = {
  price: string;
};

export const Price: React.FC<PriceProps> = ({ price }) => {
  return <div className={styles.price}>{price}</div>;
};
