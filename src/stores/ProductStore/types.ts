export type Products = {
  category?: string;
  description?: string;
  id?: number;
  image?: string;
  price?: number;
  rating?: {
    rate?: number;
    count?: number;
  };
  title?: string;
};

export interface IProductStore {
  getProduct(id: string | undefined): Promise<void>;
}
