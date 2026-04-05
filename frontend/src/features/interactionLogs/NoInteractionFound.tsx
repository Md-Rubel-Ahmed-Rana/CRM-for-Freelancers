import { MessageSquareMore } from "lucide-react";

const NoInteractionFound = () => {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-zinc-800">
        <MessageSquareMore className="h-6 w-6 text-gray-600 dark:text-zinc-300" />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
        No interaction logs found
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Start logging calls, meetings, emails, and other activities with your
        clients and projects.
      </p>
    </div>
  );
};

export default NoInteractionFound;
