import apiSlice from "@/redux/apiSlice";

const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        method: "GET",
        url: "/clients",
      }),
      providesTags: ["clients"],
    }),
  }),
});

export const { useGetAllClientsQuery } = clientApi;
