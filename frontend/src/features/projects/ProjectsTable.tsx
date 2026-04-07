import { Filter, SquarePen, Trash2 } from "lucide-react";
import {
  formatProjectCurrency,
  formatProjectDate,
  getStatusClass,
  isProjectOverdue,
} from ".";
import { IProject } from "./types";
import ProjectsFilters from "./ProjectsSearchFilters";

type Props = {
  projects: IProject[];
  selectedStatus: string;
  setSelectedStatus: (selectedStatus: string) => void;
};

const ProjectsTable = ({
  projects,
  selectedStatus,
  setSelectedStatus,
}: Props) => {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:block">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950/60">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Project
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Client
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Budget
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Deadline
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <ProjectsFilters
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {projects.map((project) => {
              const overdue = isProjectOverdue(
                project.deadline,
                project.status,
              );

              return (
                <tr
                  key={project.id}
                  className="transition hover:bg-gray-50/80 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {project.client?.name || "Unknown Client"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {formatProjectCurrency(project.budget)}
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatProjectDate(project.deadline)}
                      </p>
                      {overdue && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          Overdue
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        project.status,
                      )}`}
                    >
                      {project.status.replaceAll("_", " ")}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800">
                        <SquarePen className="h-4 w-4" />
                        Edit
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
