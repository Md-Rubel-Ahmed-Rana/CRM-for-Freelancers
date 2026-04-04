import apiSlice from "@/redux/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        method: "GET",
        url: "/dashboard",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
