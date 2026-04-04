import { AlertCircle } from "lucide-react";

const ErrorDisplayer = () => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-5" />
        <div>
          <h3 className="text-lg font-semibold">Failed to load dashboard</h3>
          <p className="mt-1 text-sm opacity-90">
            Something went wrong while fetching your dashboard data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayer;
