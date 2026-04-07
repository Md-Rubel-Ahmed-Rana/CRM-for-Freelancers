import { FolderPlus } from "lucide-react";
import CreateReminderForm from "./form";

const CreateReminder = () => {
  return (
    <section className="space-y-2">
      <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <FolderPlus className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create Reminder
            </h1>
            <p className="max-w-2xl text-sm text-gray-600 dark:text-zinc-400">
              Add a new reminder and link it to one of your existing clients and
              projects. Fill in the reminder details carefully so you can track
              deadlines, budgets, and progress from your dashboard.
            </p>
          </div>
        </div>
      </div>

      <CreateReminderForm />
    </section>
  );
};

export default CreateReminder;
