import { useMemo } from "react";
import { IReminder } from "./types";
import {
  AlertCircle,
  BellRing,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {value}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-200">
          {icon}
        </div>
      </div>
    </div>
  );
};

type Props = {
  reminders: IReminder[];
  total: number | undefined;
};

const RemindersSummaryCards = ({ reminders, total }: Props) => {
  const stats = useMemo(() => {
    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;

    let completed = 0;
    let overdue = 0;
    let dueThisWeek = 0;

    for (const reminder of reminders) {
      const due = new Date(reminder.due_date);
      const diff = due.getTime() - now.getTime();

      if (reminder.is_completed) {
        completed++;
      } else {
        if (diff < 0) overdue++;
        if (diff >= 0 && diff <= 7 * dayMs) dueThisWeek++;
      }
    }

    return {
      total: total ?? reminders.length,
      completed,
      overdue,
      dueThisWeek,
    };
  }, [total, reminders]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Reminders"
        value={stats.total}
        subtitle="All reminders in your workspace"
        icon={<BellRing className="h-5 w-5" />}
      />
      <SummaryCard
        title="Due This Week"
        value={stats.dueThisWeek}
        subtitle="Need attention within 7 days"
        icon={<CalendarClock className="h-5 w-5" />}
      />
      <SummaryCard
        title="Overdue"
        value={stats.overdue}
        subtitle="Past due and still incomplete"
        icon={<AlertCircle className="h-5 w-5" />}
      />
      <SummaryCard
        title="Completed"
        value={stats.completed}
        subtitle="Finished reminder items"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />
    </div>
  );
};

export default RemindersSummaryCards;
