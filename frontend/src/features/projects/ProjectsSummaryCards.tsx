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
  const cards = [
    {
      title: "Total Projects",
      value: filteredProjects.length,
      description: meta?.total
        ? `${meta.total} total in database`
        : "Current view",
      icon: <FolderOpen className="h-5 w-5 text-gray-400" />,
    },
    {
      title: "Active Projects",
      value: activeCount,
      description: "Currently in progress",
      icon: <Briefcase className="h-5 w-5 text-gray-400" />,
    },
    {
      title: "Completed Projects",
      value: completedCount,
      description: "Successfully delivered",
      icon: <CalendarDays className="h-5 w-5 text-gray-400" />,
    },
    {
      title: "Total Budget",
      value: formatCurrency(totalBudget),
      description: "Sum of filtered projects",
      icon: <CircleDollarSign className="h-5 w-5 text-gray-400" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          key={index}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </p>
            {card.icon}
          </div>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSummaryCards;
