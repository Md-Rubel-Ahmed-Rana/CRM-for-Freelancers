import { SquarePen, Trash2 } from "lucide-react";
import {
  formatProjectCurrency,
  formatProjectDate,
  getStatusClass,
  isProjectOverdue,
} from ".";
import { IProject } from "./types";

type Props = {
  projects: IProject[];
};

const ProjectsCards = ({ projects }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:hidden">
      {projects.map((project) => {
        const overdue = isProjectOverdue(project.deadline, project.status);

        return (
          <div
            key={project.id}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {project.client?.name || "Unknown Client"}
                </p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                  project.status,
                )}`}
              >
                {project.status.replaceAll("_", " ")}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-zinc-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Budget
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {formatProjectCurrency(project.budget)}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-zinc-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deadline
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {formatProjectDate(project.deadline)}
                </p>
                {overdue && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    Overdue
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-zinc-800 sm:col-span-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Company
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {project.client?.company || "No company"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800">
                <SquarePen className="h-4 w-4" />
                Edit
              </button>
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsCards;
