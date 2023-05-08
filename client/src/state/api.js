import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5008" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Meals", "Customers", "Transactions", "Sales", "Admins", "Dashboard"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getMeals: build.query({
      query: () => `client/meals`,
      providesTags: ["Meals"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => `management/admins`,
      providesTags: ["Admins"],
    }),
    getDashboard: build.query({
      query: () => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
    // New endpoints for tickets
    getTickets: build.query({
      query: () => `tickets`,
      providesTags: ["Tickets"],
    }),
    createTicket: build.mutation({
      query: (ticket) => ({
        url: `tickets`,
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
    getTicket: build.query({
      query: (id) => `tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "Tickets", id }],
    }),
    updateTicket: build.mutation({
      query: ({ id, ...ticket }) => ({
        url: `tickets/${id}`,
        method: "PUT",
        body: ticket,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tickets", id }],
    }),
    deleteTicket: build.mutation({
      query: (id) => ({
        url: `tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Tickets", id }],
    }),
    getTicketCountsByDay: build.query({
      query: () => `tickets/daily`,
      providesTags: ["TicketCountsByDay"],
    }),
    //post meal endpoint
    createMeal: build.mutation({
        query: (meal) => ({
          url: `client/pstmeals`,
          method: "POST",
          body: meal,
        }),
        invalidatesTags: ["Meals"],
    })
  }),
});

export const {
  useGetUserQuery,
  useGetMealsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetDashboardQuery,
  // New hooks for tickets
  useGetTicketsQuery,
  useCreateTicketMutation,
  useGetTicketQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useCreateMealMutation,
  useGetTicketCountsByDayQuery,
} = api;