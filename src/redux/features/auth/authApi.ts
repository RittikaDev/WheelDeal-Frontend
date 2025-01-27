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
    getCurrentUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/current-user",
        method: "POST",
        body: userInfo,
      }),
    }),

    changePassword: builder.mutation({
      query: (passInfo) => ({
        url: "/user/update-password",
        method: "POST",
        body: passInfo,
      }),
    }),
    updateProfile: builder.mutation({
      query: (profileInfo) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: profileInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserMutation,
  useSignupMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi; // A CUSTOM HOOK A CUSTOM HOOK PROVIDED BY RTK QUERY FOR USING THE LOGIN MUTATION. RETURNS A FUNCTION (LOGIN) FOR TRIGGERING THE MUTATION. METADATA SUCH AS ERROR, ISLOADING, ETC.
