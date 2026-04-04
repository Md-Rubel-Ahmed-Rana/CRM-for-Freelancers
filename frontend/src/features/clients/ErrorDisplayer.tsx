import { RefreshCw } from "lucide-react";

type Props = {
  refetch: () => void;
};

const ErrorDisplayer = ({ refetch }: Props) => {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/30">
      <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
        Failed to load clients
      </h2>
      <p className="mt-2 text-sm text-red-600 dark:text-red-300">
        Something went wrong while fetching client data.
      </p>

      <button
        onClick={() => refetch()}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        <RefreshCw size={16} />
        Try Again
      </button>
    </section>
  );
};

export default ErrorDisplayer;
