import { useState } from "react";
import { ChevronDown, Loader2, UserRound } from "lucide-react";
import { useGetAllClientsDropdownQuery } from "@/features/clients/api";
import { IClientDropdown } from "@/features/clients/types";

type Props = {
  setClientId: (clientId: string) => void;
};

const ClientsDropdown = ({ setClientId }: Props) => {
  const [selectedId, setSelectedId] = useState("");

  const {
    data: clientsDropdown,
    isLoading,
    isError,
  } = useGetAllClientsDropdownQuery({});

  const clients = (clientsDropdown?.data?.clients || []) as IClientDropdown[];

  const handleChange = (value: string) => {
    setSelectedId(value);
    setClientId(value);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300">
        Select Client
      </label>

      {isLoading ? (
        <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading clients...
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
          Failed to load clients. Please try again.
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-400">
          No clients found. Please create a client first before adding a
          project.
        </div>
      ) : (
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <select
            value={selectedId}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
          >
            <option value="">Choose a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ClientsDropdown;
