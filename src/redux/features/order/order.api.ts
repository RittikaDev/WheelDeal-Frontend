import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADMIN
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    // USER
    getUserOrders: builder.query({
      query: () => ({
        url: `/orders/my-bookings`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getSingleOrders: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    // CREATE ORDER
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    // UPDATE ORDER
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    // VERIFY ORDER
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),

    // DELETE ORDER
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetSingleOrdersQuery,
  useUpdateOrderMutation,
} = orderApi;
