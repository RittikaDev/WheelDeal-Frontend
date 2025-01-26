import { TResponseRedux } from "../../../types";
import { urlSearchParams } from "../../../utils/urlSearchParams";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllCars: builder.query({
			query: (params) => {
				const queryParams = params ? `?${urlSearchParams(params)}` : "";
				return {
					url: `/cars${queryParams}`,
					method: "GET",
				};
			},
			providesTags: ["cars"],
			transformResponse: (response: TResponseRedux<any[]>) => {
				return {
					data: response?.data,
					meta: response?.meta,
				};
			},
		}),
		getFeaturedCars: builder.query({
			query: () => {
				return {
					url: `/cars/featured`,
					method: "GET",
				};
			},
			transformResponse: (response: TResponseRedux<any[]>) => {
				return {
					data: response?.data,
				};
			},
		}),

		// MUTATION FOR ACTIONS THAT MODIFY SERVER-SIDE DATA
		login: builder.mutation({
			query: (userInfo) => ({
				url: "/auth/login",
				method: "POST",
				body: userInfo,
			}),
		}),
	}),
});

export const { useGetAllCarsQuery, useGetFeaturedCarsQuery } = authApi; // A CUSTOM HOOK A CUSTOM HOOK PROVIDED BY RTK QUERY FOR USING THE LOGIN MUTATION. RETURNS A FUNCTION (LOGIN) FOR TRIGGERING THE MUTATION. METADATA SUCH AS ERROR, ISLOADING, ETC.
