import {
  Briefcase,
  CalendarDays,
  CircleDollarSign,
  FolderOpen,
} from "lucide-react";
import { IProject } from "./types";
const formatCurrency = (amount: number | string) => {
  const value = Number(amount || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

type Props = {
  filteredProjects: IProject[];
  meta:
    | {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
      }
    | undefined;
  activeCount: number;
  completedCount: number;
  totalBudget: number;
};

const ProjectsSummaryCards = ({
  activeCount,
  completedCount,
  filteredProjects,
  meta,
  totalBudget,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Projects
          </p>
          <FolderOpen className="h-5 w-5 text-gray-400" />
        </div>
        <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {filteredProjects.length}
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {meta?.total ? `${meta.total} total in database` : "Current view"}
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Active Projects
          </p>
          <Briefcase className="h-5 w-5 text-gray-400" />
        </div>
        <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {activeCount}
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Currently in progress
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <CalendarDays className="h-5 w-5 text-gray-400" />
        </div>
        <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {completedCount}
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Successfully delivered
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Budget
          </p>
          <CircleDollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(totalBudget)}
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Sum of filtered projects
        </p>
      </div>
    </div>
  );
};

export default ProjectsSummaryCards;
