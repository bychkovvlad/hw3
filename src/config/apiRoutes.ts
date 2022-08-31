export const API_ROUTES = {
  GET_PRODUCTS: "https://fakestoreapi.com/products",
  GET_PRODUCT: (id: string | undefined) =>
    `https://fakestoreapi.com/products/${id}`,
  GET_CATEGORIES: "https://fakestoreapi.com/products/categories",
  GET_PRODUCT_FROM_CATEGORY: (selectedCategory: string) =>
    `https://fakestoreapi.com/products/category/${selectedCategory}`,
};
