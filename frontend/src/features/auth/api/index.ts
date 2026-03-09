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
        method: "DELETE",
        url: "/auth/logout",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useUserLoginMutation,
  useLogoutMutation,
  useUserRegisterMutation,
} = authApi;
