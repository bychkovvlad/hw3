import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Input } from "@components/Input";
import { Loader } from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import { Price } from "@components/Price";
import { SingleDropdown } from "@components/SingleDropdown";
import { ProductsStore } from "@stores/ProductsStore";
import { Meta } from "@utils/meta";
import { observer, useLocalStore } from "mobx-react-lite";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

import styles from "./ProductsPage.module.scss";

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const productsStore = useLocalStore(() => new ProductsStore());

  useEffect(() => {
    productsStore.setInputValue(searchParams.get("search") || "");
  }, [searchParams, productsStore]);

  useEffect(() => {
    productsStore.getProductsList(selectedCategory);
  }, [productsStore, selectedCategory]);

  useEffect(() => {
    productsStore.getCategoriesList();
  }, [productsStore]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      productsStore.setInputValue(e.target.value);
      navigate({
        pathname: "/",
        search: createSearchParams({
          search: e.target.value,
        }).toString(),
      });
    },
    [navigate, productsStore]
  );

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
          onChange={handleInputChange}
          value={productsStore.inputValue}
        />
        <SingleDropdown
          className={styles.singleDropdown}
          onOptionClick={setSelectedCategory}
          options={productsStore.categories}
        />
      </div>
      <div className={styles.subtitleWrapper}>
        <span className={styles.subtitle}>Total Product</span>
        <span className={styles.badge}>
          {productsStore.searchProducts.length}
        </span>
      </div>

      {productsStore.meta !== Meta.LOADING ? (
        <div className={styles.productWrapper}>
          {productsStore.searchProducts
            .slice(0, productsStore.selectedPage * 3)
            .map((product) => (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                subtitle={product.description}
                image={product.image}
                content={<Price price={`$ ${product.price}`} />}
              />
            ))}
          {productsStore.searchProducts.length >
            productsStore.selectedPage * 3 && (
            <Button
              className={styles.showMoreButton}
              onClick={() => productsStore.nextPage()}
            >
              Показать еще
            </Button>
          )}
        </div>
      ) : (
        <Loader size={LoaderSize.m} />
      )}
    </div>
  );
};

export default observer(ProductsPage);
