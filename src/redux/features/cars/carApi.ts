import { ICar, TResponseRedux } from "../../../types";
import { urlSearchParams } from "../../../utils/urlSearchParams";
import { baseApi } from "../../api/baseApi";

interface TCarResponse<T> {
	success: boolean;
	message: string;
	result: T;
	suggestedCars: [T];
}

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllCars: builder.query({
			query: (params) => {
				const queryParams = params ? `?${urlSearchParams(params)}` : "";
				// console.log("Request URL:", `/cars${queryParams}`);
				return {
					url: `/cars${queryParams}`,
					method: "GET",
				};
			},
			providesTags: ["cars"],
			transformResponse: (response: TResponseRedux<any[]>) => {
				return {
					data: response?.data,
					meta: response?.paginationMetaData,
				};
			},
		}),
		getSingleCar: builder.query<TResponseRedux<TCarResponse<ICar>>, string>({
			query: (carId) => ({
				url: `/cars/${carId}`,
				method: "GET",
			}),
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
		getCarBrandCatModel: builder.query({
			query: () => {
				return {
					url: `/cars/brands`,
					method: "GET",
				};
			},
			transformResponse: (response: TResponseRedux<any[]>) => {
				return {
					data: response?.data,
				};
			},
		}),

		// CREATE ORDER
		createProduct: builder.mutation({
			query: (data) => ({
				url: "/cars",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["cars"],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/cars/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["cars"],
		}),
		updateProduct: builder.mutation({
			query: ({ id, carData }: { id: any; carData: any }) => ({
				url: `/cars/${id}`,
				method: "PUT",
				body: carData,
			}),
			invalidatesTags: ["cars"],
		}),
	}),
});

export const {
	useGetAllCarsQuery,
	useGetSingleCarQuery,
	useGetFeaturedCarsQuery,
	useGetCarBrandCatModelQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = authApi; // A CUSTOM HOOK A CUSTOM HOOK PROVIDED BY RTK QUERY FOR USING THE LOGIN MUTATION. RETURNS A FUNCTION (LOGIN) FOR TRIGGERING THE MUTATION. METADATA SUCH AS ERROR, ISLOADING, ETC.
