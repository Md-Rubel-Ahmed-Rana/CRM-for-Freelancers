const NoClientFound = () => {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        No clients found
      </h3>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Try a different keyword or add a new client.
      </p>
    </div>
  );
};

export default NoClientFound;
