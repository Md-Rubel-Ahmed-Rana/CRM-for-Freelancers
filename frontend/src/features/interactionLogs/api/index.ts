import apiSlice from "@/redux/apiSlice";
import { ICreateInteractionFormValues } from "../types";

const interactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInteractions: builder.query({
      query: () => ({
        method: "GET",
        url: "/interactions",
      }),
      providesTags: ["interactions"],
    }),
    createInteraction: builder.mutation({
      query: (payload: ICreateInteractionFormValues) => ({
        method: "POST",
        url: "/interactions",
        body: payload,
      }),
      invalidatesTags: ["interactions"],
    }),
  }),
});

export const { useGetAllInteractionsQuery, useCreateInteractionMutation } =
  interactionApi;
