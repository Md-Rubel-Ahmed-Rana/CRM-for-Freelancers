const ClientLoadingSkeleton = () => {
  return (
    <section className="space-y-2">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="h-6 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="h-11 w-full animate-pulse rounded-xl bg-zinc-200 sm:w-[320px] dark:bg-zinc-800" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-zinc-200 sm:w-28 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 xl:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                {[
                  "Client",
                  "Company",
                  "Contact",
                  "Projects",
                  "Logs",
                  "Reminders",
                  "Notes",
                ].map((item) => (
                  <th
                    key={item}
                    className="px-6 py-4 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr
                  key={idx}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-3 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-52 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-4 w-44 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:hidden">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="h-7 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="h-4 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((__, statIdx) => (
                <div
                  key={statIdx}
                  className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60"
                >
                  <div className="mx-auto h-3 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="mx-auto mt-2 h-5 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLoadingSkeleton;
