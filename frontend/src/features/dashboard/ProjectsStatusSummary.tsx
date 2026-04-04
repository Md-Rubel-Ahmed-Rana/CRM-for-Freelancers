const statusColorMap: Record<string, string> = {
  PLANNING:
    "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
  IN_PROGRESS:
    "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
  ON_HOLD:
    "bg-purple-100 text-purple-700 ring-1 ring-inset ring-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-400/20",
  COMPLETED:
    "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  CANCELLED:
    "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-400/20",
};

type Props = {
  projectsByStatus: {
    status: string;
    count: number;
  }[];
  cardBase: string;
};

const ProjectsStatusSummary = ({ projectsByStatus, cardBase }: Props) => {
  return (
    <div className={cardBase}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Status Summary
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Quick numeric overview of each project status.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projectsByStatus.map((item) => (
          <div
            key={item.status}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-800/60"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColorMap[item.status] ?? "bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-200"}`}
                >
                  {item.status.replaceAll("_", " ")}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Count</p>
              <h4 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {item.count}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsStatusSummary;
