export type Products = {
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

export interface IProductsStore {
  getProductsList(selectedCategory: string): Promise<void>;
  getCategoriesList(): Promise<void>;
  nextPage(): number;
}
