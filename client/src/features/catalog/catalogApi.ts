import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { customBaseQuery } from "../../app/api/baseApi";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` }),
    }),
  }),
});
export const { useFetchProductsQuery, useFetchProductDetailsQuery } =
  catalogApi;
