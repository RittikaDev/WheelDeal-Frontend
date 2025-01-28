import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SIGN UP/ REGISTRATION
    register: builder.mutation({
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

    // ADMIN
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/user/all-users`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response?.data,
          meta: response?.paginationMetaData,
        };
      },
    }),
    // ADMIN
    manageStatus: builder.mutation({
      query: ({ userId, status }: { userId: string; status: boolean }) => ({
        url: `/user/${userId}/manage-status`,
        method: "PATCH",
        body: { isBlocked: status },
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
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserMutation,
  useGetAllUsersQuery,
  useManageStatusMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi; // A CUSTOM HOOK A CUSTOM HOOK PROVIDED BY RTK QUERY FOR USING THE LOGIN MUTATION. RETURNS A FUNCTION (LOGIN) FOR TRIGGERING THE MUTATION. METADATA SUCH AS ERROR, ISLOADING, ETC.
