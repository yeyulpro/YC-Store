import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5004/api",
});
