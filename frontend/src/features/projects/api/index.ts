import apiSlice from "@/redux/apiSlice";
import { ICreateProjectFormValues } from "../types";

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({
        search_query,
        status,
      }: {
        search_query?: string;
        status?: string;
      }) => ({
        method: "GET",
        url: "/projects",
        params: {
          search_query,
          status,
        },
      }),
      providesTags: ["projects"],
    }),
    getAllProjectsDropdown: builder.query({
      query: ({ client_id }: { client_id?: string }) => ({
        method: "GET",
        url: `/projects/dropdown`,
        params: {
          client_id,
        },
      }),
      providesTags: ["projects"],
    }),
    createProject: builder.mutation({
      query: (project: ICreateProjectFormValues) => ({
        method: "POST",
        url: "/projects",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetAllProjectsDropdownQuery,
} = projectApi;
