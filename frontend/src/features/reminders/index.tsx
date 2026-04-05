import { useGetAllRemindersQuery } from "./api";
import RemindersLoadingSkeleton from "./RemindersLoadingSkeleton";
import RemindersErrorDisplayer from "./RemindersErrorDisplayer";
import RemindersHeader from "./RemindersHeader";
import NoRemindersFound from "./NoRemindersFound";
import { IReminderApiResponse } from "./types";
import RemindersSummaryCards from "./RemindersSummaryCards";
import ReminderCard from "./ReminderCard";

const Reminders = () => {
  const { data, isLoading, isFetching, refetch, error } =
    useGetAllRemindersQuery({}) as {
      data?: IReminderApiResponse;
      isLoading: boolean;
      isFetching: boolean;
      refetch: () => void;
      error?: unknown;
    };

  const reminders = data?.data?.data ?? [];

  if (isLoading) {
    return <RemindersLoadingSkeleton />;
  }

  if (error) {
    return <RemindersErrorDisplayer refetch={refetch} />;
  }

  return (
    <section className="space-y-2">
      <RemindersHeader isFetching={isFetching} refetch={refetch} />

      <RemindersSummaryCards
        reminders={reminders}
        total={data?.data?.meta?.total}
      />

      {reminders.length === 0 ? (
        <NoRemindersFound />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {reminders.map((reminder) => (
            <ReminderCard reminder={reminder} key={reminder.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Reminders;
