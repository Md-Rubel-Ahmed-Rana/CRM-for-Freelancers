import { FolderOpen } from "lucide-react";

const NoProjectFound = () => {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <FolderOpen className="mx-auto h-10 w-10 text-gray-400" />
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        No projects found
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Try changing the search text or filter, or create a new project.
      </p>
    </div>
  );
};

export default NoProjectFound;
