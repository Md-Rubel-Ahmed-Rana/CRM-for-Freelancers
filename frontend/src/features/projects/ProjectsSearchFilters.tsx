import { Filter, Search } from "lucide-react";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedStatus: string;
  setSelectedStatus: (selectedStatus: string) => void;
};

const ProjectsSearchFilters = ({
  searchTerm,
  selectedStatus,
  setSearchTerm,
  setSelectedStatus,
}: Props) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by project title, client, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-45">
            <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSearchFilters;
