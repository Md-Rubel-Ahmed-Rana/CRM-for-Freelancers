import { RefreshCw, Search } from "lucide-react";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  refetch: () => void;
  isFetching: boolean;
};

const ClientHeader = ({
  searchTerm,
  setSearchTerm,
  refetch,
  isFetching,
}: Props) => {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Clients
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          View, search, and manage your client relationships in one place.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <div className="relative w-full sm:w-[320px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500"
          />
        </div>

        <button
          onClick={() => refetch()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ClientHeader;
