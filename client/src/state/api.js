import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery : fetchBaseQuery({baseUrl: "http://localhost:5001"}),
    reducerPath : "adminApi",
    tagTypes : ["User", "Meals","Customers","Transactions","Sales","Admins","Dashboard" ],
    endpoints : (build)=>({
        getUser : build.query({
            query: (id)=>  `general/user/${id}`,
            providesTags: ["User"]
        }),
        getMeals : build.query({
            query: ()=> `client/meals` ,
            providesTags: ["Meals"]
        }),
        getCustomers: build.query({
            query: ()=>    `client/customers`,
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
              }),
            providesTags: ["Transactions"]
        }),
        getSales: build.query({
            query: ()=>    `sales/sales`,
            providesTags: ["Sales"]
        }),
        getAdmins: build.query({
            query: ()=>    `management/admins`,
            providesTags: ["Admins"]
        }),
        getDashboard: build.query({
            query: ()=>    `general/dashboard`,
            providesTags: ["Dashboard"]
        }),
    })
})

export const {
    useGetUserQuery,
    useGetMealsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetDashboardQuery
} = api;