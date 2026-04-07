import apiSlice from "@/redux/apiSlice";
import { ILogin, IRegister } from "../types";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth/me",
      }),
      providesTags: ["auth"],
    }),
    userLogin: builder.mutation({
      query: (data: ILogin) => ({
        method: "POST",
        url: "/auth/login",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    userRegister: builder.mutation({
      query: (data: IRegister) => ({
        method: "POST",
        url: "/auth/register",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/auth/logout",
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation({
      query: (data: { oldPassword: string; newPassword: string }) => ({
        method: "PATCH",
        url: "/auth/change-password",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getSessions: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth/sessions",
      }),
      providesTags: ["auth"],
    }),
    revokeSession: builder.mutation({
      query: (sessionId: string) => ({
        method: "POST",
        url: `/auth/sessions/${sessionId}/revoke`,
      }),
      invalidatesTags: ["auth"],
    }),
    logoutAll: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/auth/logout-all",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useUserLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useUserRegisterMutation,
  useGetSessionsQuery,
  useRevokeSessionMutation,
  useLogoutAllMutation,
} = authApi;
