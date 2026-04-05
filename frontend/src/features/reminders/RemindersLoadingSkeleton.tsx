const ReminderCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="animate-pulse space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full space-y-3">
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
          <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-zinc-800" />
        </div>

        <div className="h-4 w-full rounded bg-gray-200 dark:bg-zinc-800" />
        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-zinc-800" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="h-20 rounded-2xl bg-gray-100 dark:bg-zinc-800" />
          <div className="h-20 rounded-2xl bg-gray-100 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
};

const RemindersLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-zinc-800" />
          <div className="h-8 w-72 rounded bg-gray-200 dark:bg-zinc-800" />
          <div className="h-4 w-96 max-w-full rounded bg-gray-200 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-zinc-800" />
              <div className="h-8 w-16 rounded bg-gray-200 dark:bg-zinc-800" />
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ReminderCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default RemindersLoadingSkeleton;
