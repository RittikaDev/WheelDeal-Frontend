import { baseApi } from "../../api/baseApi";

const newsletterApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// GET ALL newsletters
		getNewsletters: builder.query({
			query: () => ({
				url: "/newsletter",
				method: "GET",
			}),
			providesTags: ["Newsletters"],
		}),

		// CREATE newsletter
		createNewsletter: builder.mutation({
			query: (data) => ({
				url: "/newsletter",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Newsletters"],
		}),

		// UPDATE newsletter
		updateNewsletter: builder.mutation({
			query: (data) => ({
				url: `/newsletter/${data.id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Newsletters"],
		}),

		// GET newsletter by ID (optional)
		getNewsletterById: builder.query({
			query: (id) => ({
				url: `/newsletter/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{ type: "Newsletters", id }],
		}),
	}),
});

export const {
	useGetNewslettersQuery,
	useCreateNewsletterMutation,
	useUpdateNewsletterMutation,
	useGetNewsletterByIdQuery,
} = newsletterApi;
