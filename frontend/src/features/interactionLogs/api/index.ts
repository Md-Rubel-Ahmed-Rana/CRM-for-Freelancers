import apiSlice from "@/redux/apiSlice";

const interactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInteractions: builder.query({
      query: () => ({
        method: "GET",
        url: "/interactions",
      }),
      providesTags: ["interactions"],
    }),
  }),
});

export const { useGetAllInteractionsQuery } = interactionApi;
