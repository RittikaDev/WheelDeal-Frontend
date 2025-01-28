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

    // DELETE ORDER ADMIN
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/delete-order`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    // CANCEL ORDER USER
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/cancel-order/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),

    // UPDATE ORDER STATUS AND DELIVERY TIME
    updateOrderStatus: builder.mutation({
      query: ({
        orderId,
        statusDelTime,
      }: {
        orderId: string;
        statusDelTime: { status: string; deliveryDate: any };
      }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: statusDelTime,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useDeleteOrderMutation,
  useCancelOrderMutation,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetSingleOrdersQuery,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
