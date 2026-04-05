const InteractionsLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-32 animate-pulse rounded-3xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="h-52 animate-pulse rounded-3xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
};

export default InteractionsLoadingSkeleton;
