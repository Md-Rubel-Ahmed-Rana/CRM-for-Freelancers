import { Loader2, RefreshCcw } from "lucide-react";

type Props = {
  meta:
    | {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
      }
    | undefined;
  refetch: () => void;
  isFetching: boolean;
};

const InteractionsHeader = ({ isFetching, meta, refetch }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interaction Logs
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track calls, meetings, emails, and other project communication in one
          place.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-2xl border border-gray-200 px-3 py-2 text-sm text-gray-600 dark:border-zinc-800 dark:text-zinc-300">
          Page{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {meta?.page ?? 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {meta?.totalPage ?? 1}
          </span>
        </div>

        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
          Refresh
        </button>
      </div>
    </div>
  );
};

export default InteractionsHeader;
