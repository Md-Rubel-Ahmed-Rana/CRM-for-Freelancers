import { RefreshCcw, TriangleAlert } from "lucide-react";

type Props = {
  refetch: () => void;
};

const InteractionErrorDisplayer = ({ refetch }: Props) => {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 dark:border-red-500/20 dark:bg-red-500/10">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-red-100 p-3 text-red-700 dark:bg-red-500/10 dark:text-red-300">
          <TriangleAlert className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Failed to load interaction logs
          </h3>
          <p className="mt-1 text-sm text-red-600 dark:text-red-200/90">
            Something went wrong while fetching interaction history. Please try
            again.
          </p>

          <button
            onClick={refetch}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractionErrorDisplayer;
