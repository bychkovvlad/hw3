import React, { useCallback, useEffect, useState } from "react";

import { Card } from "@components/Card";
import { Input } from "@components/Input";
import { Price } from "@components/Price";
import { SingleDropdown } from "@components/SingleDropdown";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import styles from "./ProductsPage.module.scss";

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

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((result) => {
      setProducts(result.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((result) => {
          setProducts(result.data);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (categories.length === 0) {
      axios
        .get("https://fakestoreapi.com/products/categories")
        .then((result) => {
          setCategories(result.data);
        });
    }
  }, [categories.length]);

  const handleCategoryClick = useCallback((category: string | undefined) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>Products</span>
        <span className={styles.description}>
          We display products based on the latest products we have, if you want
          <br />
          to see our old products please enter the name of the item
        </span>
      </div>
      <div className={styles.searchWrapper}>
        <Input
          className={styles.inputSearch}
          placeholder="SearchProperty"
          onChange={() => {}}
        />
        <SingleDropdown
          className={styles.singleDropdown}
          onOptionClick={handleCategoryClick}
          options={categories}
        />
      </div>
      <div className={styles.subtitleWrapper}>
        <span className={styles.subtitle}>Total Product</span>
        <span className={styles.badge}>{products.length}</span>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={() => {
          setSelectedPage((prev) => ++prev);
        }}
        hasMore={true}
        loader={<div>Loading...</div>}
        className={styles.productWrapper}
      >
        {products.slice(0, selectedPage * 6).map((product) => (
          <Link
            to={`/product-${product.id}`}
            key={product.id}
            className={styles.linkWrapper}
          >
            <Card
              title={product.title}
              category={product.category}
              subtitle={product.description}
              image={product.image}
              content={<Price price={`$ ${product.price}`} />}
            />
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};
