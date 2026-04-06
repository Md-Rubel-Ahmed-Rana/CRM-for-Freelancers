import apiSlice from "@/redux/apiSlice";
import { ICreateProjectFormValues } from "../types";

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        method: "GET",
        url: "/projects",
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

export const { useGetAllProjectsQuery, useCreateProjectMutation } = projectApi;
