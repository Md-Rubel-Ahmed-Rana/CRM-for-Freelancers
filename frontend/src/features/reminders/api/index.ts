import apiSlice from "@/redux/apiSlice";
import { ICreateReminderFormValues } from "../types";

const reminderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReminders: builder.query({
      query: () => ({
        method: "GET",
        url: "/reminders",
      }),
      providesTags: ["reminders"],
    }),
    createReminder: builder.mutation({
      query: (data: ICreateReminderFormValues) => ({
        method: "POST",
        url: "/reminders",
        body: data,
      }),
      invalidatesTags: ["reminders"],
    }),
  }),
});

export const { useGetAllRemindersQuery, useCreateReminderMutation } =
  reminderApi;
