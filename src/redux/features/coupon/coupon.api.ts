import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ALL
    getCoupon: builder.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
      }),
      providesTags: ["coupons"],
    }),
    // CREATE COUPON
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupons"],
    }),
    // CREATE COUPON
    applyCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupons"],
    }),

    // UPDATE ORDER
    updateCoupon: builder.mutation({
      query: (data) => ({
        url: `/coupon/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetCouponQuery,
  useCreateCouponMutation,
  useApplyCouponMutation,
  useUpdateCouponMutation,
} = couponApi;
