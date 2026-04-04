const DashboardSummaryHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-linear-to-r from-white to-gray-50 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monitor clients, projects, reminders, and overall workflow at a
          glance.
        </p>
      </div>
    </div>
  );
};

export default DashboardSummaryHeader;
