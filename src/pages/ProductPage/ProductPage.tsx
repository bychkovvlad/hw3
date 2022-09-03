import React, { useEffect } from "react";

import { Button, ButtonColor } from "@components/Button";
import { Loader } from "@components/Loader";
import { ProductStore } from "@stores/ProductStore";
import { Meta } from "@utils/meta";
import { observer, useLocalStore } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import styles from "./ProductPage.module.scss";

const ProductPage: React.FC = () => {
  const params = useParams();
  const productStore = useLocalStore(() => new ProductStore());

  useEffect(() => {
    productStore.getProduct(params.id);
  }, [productStore, params.id]);

  if (productStore.meta === Meta.LOADING) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={productStore.product?.image}
          alt={productStore.product?.title}
        />
        <div>
          <div className={styles.title}>{productStore.product?.title}</div>
          <div className={styles.category}>
            {productStore.product?.category}
          </div>
          <div className={styles.rating}>
            <div>Rate {productStore.product?.rating?.rate}</div>
          </div>
          <div className={styles.description}>
            {productStore.product?.description}
          </div>
          <div className={styles.price}>${productStore.product?.price}</div>
          <div className={styles.buttonsWrapper}>
            <Button className={styles.buyButton}>Buy Now</Button>
            <Button
              className={styles.addToChartButton}
              color={ButtonColor.secondary}
            >
              Add to Chart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductPage);
