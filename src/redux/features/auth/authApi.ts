import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// SIGN UP/ REGISTRATION
		signup: builder.mutation({
			query: (payload) => {
				return {
					url: "/auth/register",
					method: "POST",
					body: payload,
				};
			},
		}),
		// LOGIN
		// MUTATION FOR ACTIONS THAT MODIFY SERVER-SIDE DATA
		login: builder.mutation({
			query: (userInfo) => ({
				url: "/auth/login",
				method: "POST",
				body: userInfo,
			}),
		}),

		// GET CURRENT LOGGED-IN USER
		getCurrentUser: builder.query({
			query: () => {
				return {
					url: "/auth/current-user",
					method: "GET",
				};
			},
			// providesTags: ["currentUser"],
		}),
	}),
});

export const { useLoginMutation, useGetCurrentUserQuery, useSignupMutation } =
	authApi; // A CUSTOM HOOK A CUSTOM HOOK PROVIDED BY RTK QUERY FOR USING THE LOGIN MUTATION. RETURNS A FUNCTION (LOGIN) FOR TRIGGERING THE MUTATION. METADATA SUCH AS ERROR, ISLOADING, ETC.
