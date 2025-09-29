import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
});
