import { ArrowRight, CalendarDays } from "lucide-react";

type Props = {
  upcomingReminders: any[];
  cardBase: string;
};

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const UpcomingReminders = ({ upcomingReminders, cardBase }: Props) => {
  return (
    <div className={cardBase}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upcoming Reminders
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your next scheduled tasks and follow-ups.
          </p>
        </div>
        <div className="rounded-xl bg-gray-100 p-2 dark:bg-zinc-800">
          <CalendarDays className="size-5 text-gray-700 dark:text-gray-300" />
        </div>
      </div>

      {/* // reminders list */}
      <div className="space-y-3">
        {upcomingReminders.length > 0 ? (
          upcomingReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-gray-200 hover:bg-gray-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {reminder.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {reminder.description}
                  </p>
                </div>

                <div className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                  Pending
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDateTime(reminder.due_date)}</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-zinc-700 dark:text-gray-400">
            No upcoming reminders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingReminders;
