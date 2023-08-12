import { GetKpisResponse } from "@/types/getKpisResponse";
import { GetProductsResponse } from "@/types/getProductsResponse";
import { GetTransactionsResponse } from "@/types/getTransactionsResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
    reducerPath: "main",
    // Tags to keep info of each api data
    tagTypes: ["Kpis", "Products", "Transactions"],
    // Where we create our API Calls
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"]
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",
            providesTags: ["Products"]
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"]
        })
    })
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
