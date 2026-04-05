import { Clock3, FolderKanban, User2 } from "lucide-react";
import { IReminder } from "./types";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatShortDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getDueMeta = (dueDate: string, isCompleted: boolean) => {
  if (isCompleted) {
    return {
      label: "Completed",
      tone: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
      cardTone: "border-emerald-200/70 dark:border-emerald-900/50",
    };
  }

  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (diff < 0) {
    return {
      label: "Overdue",
      tone: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20",
      cardTone: "border-red-200/80 dark:border-red-900/50",
    };
  }

  if (diff <= dayMs) {
    return {
      label: "Due Today / Soon",
      tone: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
      cardTone: "border-amber-200/80 dark:border-amber-900/50",
    };
  }

  if (diff <= 7 * dayMs) {
    return {
      label: "This Week",
      tone: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20",
      cardTone: "border-blue-200/80 dark:border-blue-900/50",
    };
  }

  return {
    label: "Upcoming",
    tone: "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700",
    cardTone: "border-gray-200 dark:border-zinc-800",
  };
};

type Props = {
  reminder: IReminder;
};

const ReminderCard = ({ reminder }: Props) => {
  const dueMeta = getDueMeta(reminder.due_date, reminder.is_completed);
  return (
    <article
      key={reminder.id}
      className={`rounded-3xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900 ${dueMeta.cardTone}`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${dueMeta.tone}`}
              >
                {dueMeta.label}
              </span>

              {reminder.project?.status && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-zinc-800 dark:text-zinc-300">
                  Project: {reminder.project.status}
                </span>
              )}
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {reminder.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {reminder.description || "No description provided."}
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-gray-50 px-4 py-3 text-sm dark:bg-zinc-800/80">
            <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-200">
              <Clock3 className="h-4 w-4" />
              <span className="font-medium">Due</span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {formatDateTime(reminder.due_date)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="mb-3 flex items-center gap-2">
              <User2 className="h-4 w-4 text-gray-600 dark:text-zinc-300" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Client Details
              </h3>
            </div>

            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {reminder.client?.name ?? "Unknown Client"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {reminder.client?.company || "No company name"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {reminder.client?.email || "No email"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {reminder.client?.phone || "No phone"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="mb-3 flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-gray-600 dark:text-zinc-300" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Project Details
              </h3>
            </div>

            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {reminder.project?.title ?? "Unknown Project"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Budget: ${reminder.project?.budget ?? "0"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Deadline:{" "}
                {reminder.project?.deadline
                  ? formatShortDate(reminder.project.deadline)
                  : "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Status: {reminder.project?.status ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReminderCard;
