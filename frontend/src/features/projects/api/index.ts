import apiSlice from "@/redux/apiSlice";

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        method: "GET",
        url: "/projects",
      }),
      providesTags: ["projects"],
    }),
  }),
});

export const { useGetAllProjectsQuery } = projectApi;
