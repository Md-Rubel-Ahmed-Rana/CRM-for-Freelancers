import { AlertCircle } from "lucide-react";

const SessionErrorDisplayer = () => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5" />
        <div>
          <h2 className="font-semibold">Failed to load sessions</h2>
          <p className="mt-1 text-sm">
            Something went wrong while fetching your active sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionErrorDisplayer;
