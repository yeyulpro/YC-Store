
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../app/api/baseApi";
import type { CreateOrder, Order } from "../../app/models/order";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: () => "orders",
        }),
        fetchOrderDetailed: builder.query<Order, number>({
            query: (id) => `orders/${id}`,

        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (order) => ({
                url: "orders",
                method: "POST",
                body: order,
            }),
        }),
    }),
});
export const {
    useFetchOrdersQuery,
    useFetchOrderDetailedQuery,
    useCreateOrderMutation
} = orderApi;
