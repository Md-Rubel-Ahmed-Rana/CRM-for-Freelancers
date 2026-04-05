import { useGetAllInteractionsQuery } from "./api";
import InteractionsLoadingSkeleton from "./InteractionsLoadingSkeleton";
import InteractionErrorDisplayer from "./InteractionErrorDisplayer";
import NoInteractionFound from "./NoInteractionFound";
import InteractionsHeader from "./InteractionsHeader";
import { IInteractionsResponse } from "./types";
import InteractionsSummaryCards from "./InteractionsSummaryCards";
import InteractionCard from "./InteractionCard";

const InteractionLogs = () => {
  const { data, isLoading, isFetching, refetch, error } =
    useGetAllInteractionsQuery({}) as {
      data?: IInteractionsResponse;
      isLoading: boolean;
      isFetching: boolean;
      refetch: () => void;
      error?: unknown;
    };

  const interactions = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  if (isLoading) {
    return <InteractionsLoadingSkeleton />;
  }

  if (error) {
    return <InteractionErrorDisplayer refetch={refetch} />;
  }

  if (!interactions.length) {
    return <NoInteractionFound />;
  }

  return (
    <section className="space-y-6">
      <InteractionsHeader
        isFetching={isFetching}
        meta={meta}
        refetch={refetch}
      />

      <InteractionsSummaryCards
        interactions={interactions}
        total={meta?.total}
      />

      <div className="space-y-4">
        {interactions.map((interaction) => (
          <InteractionCard interaction={interaction} key={interaction.id} />
        ))}
      </div>
    </section>
  );
};

export default InteractionLogs;
