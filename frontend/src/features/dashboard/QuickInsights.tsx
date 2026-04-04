type Props = {
  cardBase: string;
  summary?: {
    totalActiveProjects: number;
    totalDueReminders: number;
  };
};

const QuickInsights = ({ cardBase, summary }: Props) => {
  return (
    <div className={cardBase}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Quick Insights
      </h3>

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-500/10">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Most workload is active
          </p>
          <p className="mt-1 text-sm text-blue-700/80 dark:text-blue-200/80">
            You currently have {summary?.totalActiveProjects ?? 0} active
            projects in motion.
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-500/10">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Follow-up pressure this week
          </p>
          <p className="mt-1 text-sm text-amber-700/80 dark:text-amber-200/80">
            There are {summary?.totalDueReminders ?? 0} reminder items that need
            attention soon.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Healthy completion count
          </p>
          <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-200/80">
            Completed projects are already part of your strong delivery flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickInsights;
