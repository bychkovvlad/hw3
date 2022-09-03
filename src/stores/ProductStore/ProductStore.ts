import { API_ROUTES } from "@config/apiRoutes";
import { Meta } from "@utils/meta";
import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";

import { IProductStore, Products } from "./types";

type PrivateFields = "_product" | "_meta";

export default class ProductStore implements IProductStore {
  private _product: Products = {};
  private _meta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      product: computed,
      meta: computed,
      getProduct: action,
    });
  }

  get product(): Products {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProduct(id: string | undefined): Promise<void> {
    this._meta = Meta.LOADING;
    this._product = {};

    axios
      .get(API_ROUTES.GET_PRODUCT(id))
      .then((response) => {
        this._meta = Meta.SUCCESS;
        this._product = response.data;
      })
      .catch(() => {
        this._meta = Meta.ERROR;
      });
  }
}
