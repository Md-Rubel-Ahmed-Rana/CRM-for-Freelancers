import apiSlice from "@/redux/apiSlice";

const reminderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReminders: builder.query({
      query: () => ({
        method: "GET",
        url: "/reminders",
      }),
      providesTags: ["reminders"],
    }),
  }),
});

export const { useGetAllRemindersQuery } = reminderApi;
