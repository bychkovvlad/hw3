import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Input } from "@components/Input";
import { Loader } from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import { Price } from "@components/Price";
import { SingleDropdown } from "@components/SingleDropdown";
import { createProductPath } from "@config/routes";
import { ProductsStore } from "@stores/ProductsStore";
import { Meta } from "@utils/meta";
import { observer, useLocalStore } from "mobx-react-lite";
// import InfiniteScroll from "react-infinite-scroll-component";
import {
  Link,
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
  const [inputValue, setInputValue] = useState("");

  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, [inputValue, navigate, searchParams]);

  const productsStore = useLocalStore(() => new ProductsStore());

  useEffect(() => {
    productsStore.getProductsList(selectedCategory);
    productsStore.getCategoriesList();
  }, [productsStore, selectedCategory]);

  const handleCategoryClick = useCallback((category: string | undefined) => {
    setSelectedCategory(category);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      navigate({
        pathname: "/",
        search: createSearchParams({
          search: e.target.value,
        }).toString(),
      });
    },
    [navigate]
  );

  const handleNextProductLoad = useCallback(() => {
    setSelectedPage((prev) => ++prev);
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
          onChange={handleInputChange}
          value={inputValue}
        />
        <SingleDropdown
          className={styles.singleDropdown}
          onOptionClick={handleCategoryClick}
          options={productsStore.categories}
        />
      </div>
      <div className={styles.subtitleWrapper}>
        <span className={styles.subtitle}>Total Product</span>
        <span className={styles.badge}>
          {
            productsStore.products.filter(
              (el) =>
                el.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
            ).length
          }
        </span>
      </div>

      {productsStore.meta !== Meta.LOADING ? (
        <div className={styles.productWrapper}>
          {productsStore.products
            .filter(
              (el) =>
                el.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
            )
            .slice(0, selectedPage * 3)
            .map((product) => (
              <Link
                to={createProductPath(product.id)}
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
          {productsStore.products.filter(
            (el) =>
              el.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
          ).length >
            selectedPage * 3 && (
            <Button
              className={styles.showMoreButton}
              onClick={handleNextProductLoad}
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
