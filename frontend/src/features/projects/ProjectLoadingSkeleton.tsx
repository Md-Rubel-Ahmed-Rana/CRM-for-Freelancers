const ProjectLoadingSkeleton = () => {
  return (
    <section className="space-y-2 animate-pulse">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-zinc-800" />
            </div>
            <div className="mt-4 h-8 w-16 rounded-xl bg-gray-200 dark:bg-zinc-800" />
            <div className="mt-2 h-3 w-28 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:block">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/60">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-20 rounded-xl bg-gray-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-zinc-800">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-4 px-6 py-5">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="h-3 w-20 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-24 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="h-3 w-20 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              </div>

              <div className="h-4 w-20 rounded-xl bg-gray-200 dark:bg-zinc-800 self-center" />
              <div className="h-4 w-24 rounded-xl bg-gray-200 dark:bg-zinc-800 self-center" />
              <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-zinc-800 self-center" />
              <div className="flex justify-end gap-2">
                <div className="h-9 w-20 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="h-9 w-20 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="h-5 w-36 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                <div className="h-4 w-24 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              </div>
              <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-zinc-800" />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-gray-100 p-3 dark:bg-zinc-800">
                <div className="h-3 w-16 rounded-xl bg-gray-200 dark:bg-zinc-700" />
                <div className="mt-2 h-4 w-24 rounded-xl bg-gray-200 dark:bg-zinc-700" />
              </div>

              <div className="rounded-2xl bg-gray-100 p-3 dark:bg-zinc-800">
                <div className="h-3 w-16 rounded-xl bg-gray-200 dark:bg-zinc-700" />
                <div className="mt-2 h-4 w-24 rounded-xl bg-gray-200 dark:bg-zinc-700" />
              </div>

              <div className="rounded-2xl bg-gray-100 p-3 dark:bg-zinc-800 sm:col-span-2">
                <div className="h-3 w-20 rounded-xl bg-gray-200 dark:bg-zinc-700" />
                <div className="mt-2 h-4 w-40 rounded-xl bg-gray-200 dark:bg-zinc-700" />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="h-10 flex-1 rounded-2xl bg-gray-200 dark:bg-zinc-800" />
              <div className="h-10 flex-1 rounded-2xl bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectLoadingSkeleton;
