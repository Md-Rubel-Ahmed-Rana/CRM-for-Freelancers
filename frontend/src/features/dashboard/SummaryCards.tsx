import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FolderKanban,
} from "lucide-react";

type Props = {
  cardBase: string;
  summary?: {
    totalClients: number;
    totalProjects: number;
    totalDueReminders: number;
    totalActiveProjects: number;
  };
};

const SummaryCards = ({ cardBase, summary }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Clients
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {summary?.totalClients ?? 0}
            </h2>
          </div>
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            <BriefcaseBusiness className="size-5" />
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Projects
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {summary?.totalProjects ?? 0}
            </h2>
          </div>
          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            <FolderKanban className="size-5" />
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Due Reminders
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {summary?.totalDueReminders ?? 0}
            </h2>
          </div>
          <div className="rounded-xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Clock3 className="size-5" />
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Projects
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {summary?.totalActiveProjects ?? 0}
            </h2>
          </div>
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle2 className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
