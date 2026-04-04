import { RefreshCcw } from "lucide-react";

type Props = {
  refetch: () => void;
};

const ProjectsErrorDisplayer = ({ refetch }: Props) => {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-500/20 dark:bg-red-500/10">
      <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
        Failed to load projects
      </h2>
      <p className="mt-2 text-sm text-red-600 dark:text-red-200/80">
        Something went wrong while fetching project data.
      </p>
      <button
        onClick={refetch}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        <RefreshCcw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
};

export default ProjectsErrorDisplayer;
