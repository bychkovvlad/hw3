import { API_ROUTES } from "@config/apiRoutes";
import { Meta } from "@utils/meta";
import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";

import { IProductsStore, Products } from "./types";

type PrivateFields =
  | "_products"
  | "_meta"
  | "_categories"
  | "_selectedPage"
  | "_inputValue";

export default class ProductsStore implements IProductsStore {
  private _products: Products[] = [];
  private _categories: string[] = [];
  private _selectedPage: number = 1;
  private _inputValue: string = "";
  private _meta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable,
      _meta: observable,
      _categories: observable,
      _selectedPage: observable,
      _inputValue: observable,
      products: computed,
      categories: computed,
      meta: computed,
      selectedPage: computed,
      inputValue: computed,
      getProductsList: action,
    });
  }

  get products(): Products[] {
    return this._products;
  }

  get searchProducts(): Products[] {
    return this._products.filter(
      (el) => el.title.toLowerCase().indexOf(this._inputValue) > -1
    );
  }

  get meta(): Meta {
    return this._meta;
  }

  get categories(): string[] {
    return this._categories;
  }

  get inputValue(): string {
    return this._inputValue;
  }

  get selectedPage(): number {
    return this._selectedPage;
  }

  async getProductsList(selectedCategory: string | undefined): Promise<void> {
    this._meta = Meta.LOADING;

    if (selectedCategory) {
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

    axios
      .get(API_ROUTES.GET_CATEGORIES)
      .then((response) => {
        this._categories = response.data;
      })
      .catch(() => {
        this._meta = Meta.ERROR;
      });
  }

  nextPage() {
    return ++this._selectedPage;
  }

  setInputValue(newInputValue: string) {
    this._inputValue = newInputValue;
  }
}
