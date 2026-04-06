import { useGetAllRemindersQuery } from "./api";
import RemindersLoadingSkeleton from "./RemindersLoadingSkeleton";
import { IReminderApiResponse } from "./types";
import RemindersSummaryCards from "./RemindersSummaryCards";
import ReminderCard from "./ReminderCard";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import DataFetchErrorState from "@/components/DataFetchErrorState";
import NoDataFound from "@/components/NoDataFound";

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
  const meta = data?.data?.meta;

  const [searchTerm, setSearchTerm] = useState("");

  const loading = isLoading || isFetching;

  if (error) {
    return (
      <DataFetchErrorState
        pageTitle="Reminders"
        refetch={refetch}
        isRetrying={isLoading || isFetching}
        pageShortDescription="We couldn't fetch reminders. There might be server error occur. Please try again!"
      />
    );
  }

  return (
    <section className="space-y-2">
      <PageHeader
        pageTitle="Reminders"
        pageShortDescription="Manage all your reminders in one place."
        newItemLink="/reminders/new"
        refetch={refetch}
        isFetching={isFetching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search reminders..."
        totalItems={meta?.total || reminders.length}
      />

      {loading ? (
        <RemindersLoadingSkeleton />
      ) : (
        <>
          <RemindersSummaryCards
            reminders={reminders}
            total={data?.data?.meta?.total}
          />

          {reminders.length === 0 ? (
            <NoDataFound title="Reminders" />
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {reminders.map((reminder) => (
                <ReminderCard reminder={reminder} key={reminder.id} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Reminders;
