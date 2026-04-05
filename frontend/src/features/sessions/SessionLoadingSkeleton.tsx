const SessionLoadingSkeleton = () => {
  return (
    <section className="space-y-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-100 dark:bg-zinc-800/70" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-blue-100 dark:bg-zinc-800" />
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-800" />
                    <div className="h-4 w-72 animate-pulse rounded-md bg-gray-100 dark:bg-zinc-800/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SessionLoadingSkeleton;
