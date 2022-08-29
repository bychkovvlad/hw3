import React, { useEffect, useState } from "react";

import { Button, ButtonColor } from "@components/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./ProductPage.module.scss";

type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};

export const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product>();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${params.id}`)
      .then((result) => {
        setProduct(result.data);
      });
  }, [params.id]);

  return (
    <div>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={product?.image}
          alt={product?.title}
        />
        <div>
          <div className={styles.title}>{product?.title}</div>
          <div className={styles.category}>{product?.category}</div>
          <div className={styles.rating}>
            <div>Rate {product?.rating.rate}</div>
          </div>
          <div className={styles.description}>{product?.description}</div>
          <div className={styles.price}>${product?.price}</div>
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
