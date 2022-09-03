import { API_ROUTES } from "@config/apiRoutes";
import { Meta } from "@utils/meta";
import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";

import { IProductsStore, Products } from "./types";

type PrivateFields = "_products" | "_meta" | "_categories";

export default class ProductsStore implements IProductsStore {
  private _products: Products[] = [];
  private _searchProducts: Products[] = [];
  private _categories: string[] = [];
  private _meta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable,
      _meta: observable,
      _categories: observable,
      products: computed,
      meta: computed,
      getProductsList: action,
    });
  }

  get products(): Products[] {
    return this._products;
  }

  get meta(): Meta {
    return this._meta;
  }

  get categories(): string[] {
    return this._categories;
  }

  async getProductsList(selectedCategory: string | undefined): Promise<void> {
    this._meta = Meta.LOADING;
    this._products = [];

    if (selectedCategory !== undefined) {
      axios
        .get(API_ROUTES.GET_PRODUCT_FROM_CATEGORY(selectedCategory))
        .then((response) => {
          this._meta = Meta.SUCCESS;
          this._products = response.data;
        })
        .catch(() => {
          this._meta = Meta.ERROR;
        });
    } else {
      axios
        .get(API_ROUTES.GET_PRODUCTS)
        .then((response) => {
          this._meta = Meta.SUCCESS;
          this._products = response.data;
        })
        .catch(() => {
          this._meta = Meta.ERROR;
        });
    }
  }

  async getCategoriesList(): Promise<void> {
    this._meta = Meta.LOADING;
    this._categories = [];

    axios
      .get(API_ROUTES.GET_CATEGORIES)
      .then((response) => {
        this._categories = response.data;
      })
      .catch(() => {
        this._meta = Meta.ERROR;
      });
  }
}
