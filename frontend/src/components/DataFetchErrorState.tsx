import { RefreshCw, AlertTriangle } from "lucide-react";

type Props = {
  pageTitle: string;
  pageShortDescription?: string;
  errorMessage?: string;
  refetch: () => void;
  isRetrying?: boolean;
};

const DataFetchErrorState = ({
  pageTitle,
  pageShortDescription,
  errorMessage,
  refetch,
  isRetrying = false,
}: Props) => {
  return (
    <section
      aria-live="polite"
      className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm dark:border-red-900/40 dark:bg-red-950/30 w-full flex justify-center items-center h-full flex-col"
    >
      <div className="flex items-center flex-col gap-3">
        <div className="flex gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Failed to load {pageTitle.toLowerCase()}
          </h2>
        </div>

        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          {errorMessage ||
            pageShortDescription ||
            "Something went wrong while fetching the data. Please try again."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isRetrying}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
      </div>
    </section>
  );
};

export default DataFetchErrorState;
