import { useGetAllInteractionsQuery } from "./api";
import InteractionsLoadingSkeleton from "./InteractionsLoadingSkeleton";
import { IInteractionsResponse } from "./types";
import InteractionsSummaryCards from "./InteractionsSummaryCards";
import InteractionCard from "./InteractionCard";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import DataFetchErrorState from "@/components/DataFetchErrorState";
import NoDataFound from "@/components/NoDataFound";

const InteractionLogs = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const { data, isLoading, isFetching, refetch, error } =
    useGetAllInteractionsQuery(
      { search_query: searchTerm },
      {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
      },
    ) as {
      data?: IInteractionsResponse;
      isLoading: boolean;
      isFetching: boolean;
      refetch: () => void;
      error?: unknown;
    };

  const interactions = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const loading = isLoading || isFetching;

  if (error) {
    return (
      <DataFetchErrorState
        pageTitle="Interaction Logs"
        refetch={refetch}
        isRetrying={isLoading || isFetching}
        pageShortDescription="We couldn't fetch interaction logs. There might be server error occur. Please try again!"
      />
    );
  }

  return (
    <section className="space-y-2">
      <PageHeader
        pageTitle="Interactions"
        pageShortDescription="Manage all your interaction logs in one place."
        newItemLink="/logs/new"
        refetch={refetch}
        isFetching={isFetching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search on notes..."
        totalItems={meta?.total || interactions.length}
      />

      {loading ? (
        <InteractionsLoadingSkeleton />
      ) : (
        <>
          <InteractionsSummaryCards
            interactions={interactions}
            total={meta?.total}
          />
          {!interactions.length ? (
            <NoDataFound title="Interactions" />
          ) : (
            <>
              <div className="space-y-2">
                {interactions.map((interaction) => (
                  <InteractionCard
                    interaction={interaction}
                    key={interaction.id}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default InteractionLogs;
