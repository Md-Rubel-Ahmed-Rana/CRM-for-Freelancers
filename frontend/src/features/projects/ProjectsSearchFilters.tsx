import { Filter } from "lucide-react";

type Props = {
  selectedStatus: string;
  setSelectedStatus: (selectedStatus: string) => void;
};

const ProjectsFilters = ({ selectedStatus, setSelectedStatus }: Props) => {
  return (
    <div className="relative">
      <Filter className="pointer-events-none absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="h-8 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-11 -pr-5 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
      >
        <option disabled value="ALL">
          Status
        </option>
        <option value="PLANNING">Planning</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="ON_HOLD">On Hold</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
};

export default ProjectsFilters;
