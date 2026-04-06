import apiSlice from "@/redux/apiSlice";
import { IClientFormValues } from "../types";

const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        method: "GET",
        url: "/clients",
      }),
      providesTags: ["clients"],
    }),
    getAllClientsDropdown: builder.query({
      query: () => ({
        method: "GET",
        url: "/clients/dropdown",
      }),
      providesTags: ["clients"],
    }),
    createClient: builder.mutation({
      query: (client: IClientFormValues) => ({
        method: "POST",
        url: "/clients",
        body: client,
      }),
      invalidatesTags: ["clients"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useCreateClientMutation,
  useGetAllClientsDropdownQuery,
} = clientApi;
