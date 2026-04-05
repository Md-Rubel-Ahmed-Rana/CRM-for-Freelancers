import { AlertCircle, RefreshCcw } from "lucide-react";

type Props = {
  refetch: () => void;
};

const RemindersErrorDisplayer = ({ refetch }: Props) => {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm dark:border-red-900/50 dark:bg-red-950/30">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Failed to load reminders
          </h2>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Something went wrong while fetching your reminders. Please try
            again.
          </p>

          <button
            onClick={refetch}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemindersErrorDisplayer;
