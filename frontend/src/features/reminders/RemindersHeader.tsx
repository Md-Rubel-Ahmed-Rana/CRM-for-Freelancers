import { RefreshCcw } from "lucide-react";

type Props = {
  refetch: () => void;
  isFetching: boolean;
};

const RemindersHeader = ({ isFetching, refetch }: Props) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
            Reminders
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            Stay on top of follow-ups, delivery deadlines, and client action
            items with a clear overview of what needs attention next.
          </p>
        </div>

        <button
          onClick={refetch}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default RemindersHeader;
