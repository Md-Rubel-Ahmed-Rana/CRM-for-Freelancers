import { ShieldCheck } from "lucide-react";

const NoSessionFound = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <ShieldCheck className="mx-auto h-10 w-10 text-gray-400" />
      <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        No sessions found
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        You do not have any active sessions right now.
      </p>
    </div>
  );
};

export default NoSessionFound;
