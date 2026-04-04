import { Plus, RefreshCcw } from "lucide-react";

type Props = {
  refetch: () => void;
  isFetching: boolean;
};

const ProjectsHeader = ({ isFetching, refetch }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage all client projects with status, budget, and deadlines.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsHeader;
