import { BellRing } from "lucide-react";

const NoRemindersFound = () => {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-zinc-800">
        <BellRing className="h-6 w-6 text-gray-600 dark:text-zinc-300" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        No reminders found
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        You don’t have any reminders yet. Add one to keep track of client or
        project follow-ups.
      </p>
    </div>
  );
};

export default NoRemindersFound;
