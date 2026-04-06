/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { Mail, Phone, Building2, Plus } from "lucide-react";
import { useGetAllClientsQuery } from "./api";
import { IClient } from "./types";
import ClientLoadingSkeleton from "./ClientLoadingSkeleton";
import PageHeader from "@/components/PageHeader";
import DataFetchErrorState from "@/components/DataFetchErrorState";
import NoDataFound from "@/components/NoDataFound";

const Clients = () => {
  const { data, error, isLoading, refetch, isFetching } = useGetAllClientsQuery(
    {},
  );
  const [searchTerm, setSearchTerm] = useState("");

  const clients = (data?.data?.data || []) as IClient[];
  const meta = data?.data?.meta;

  const filteredClients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return clients;

    return clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone.toLowerCase().includes(term) ||
        client.company?.toLowerCase().includes(term) ||
        client.notes?.toLowerCase().includes(term)
      );
    });
  }, [clients, searchTerm]);

  const loading = isLoading || isFetching;

  if (error) {
    return (
      <DataFetchErrorState
        pageTitle="Clients"
        refetch={refetch}
        isRetrying={isLoading || isFetching}
        pageShortDescription="We couldn't fetch clients. There might be server error occur. Please try again!"
      />
    );
  }

  return (
    <section className="space-y-2">
      <PageHeader
        pageTitle="Clients"
        pageShortDescription="View, search, and manage your client relationships in one place."
        newItemLink="/clients/new"
        refetch={refetch}
        isFetching={isFetching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search clients..."
        totalItems={meta?.total || clients?.length}
      />

      {loading ? (
        <ClientLoadingSkeleton />
      ) : (
        <>
          {filteredClients.length === 0 ? (
            <NoDataFound title="Clients" />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 xl:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                      <tr className="text-left text-sm text-zinc-500 dark:text-zinc-400">
                        <th className="px-6 py-4 font-medium">Client</th>
                        <th className="px-6 py-4 font-medium">Company</th>
                        <th className="px-6 py-4 font-medium">Contact</th>
                        <th className="px-6 py-4 font-medium">Projects</th>
                        <th className="px-6 py-4 font-medium">Logs</th>
                        <th className="px-6 py-4 font-medium">Reminders</th>
                        <th className="px-6 py-4 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr
                          key={client.id}
                          className="border-t border-zinc-200 text-sm dark:border-zinc-800"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-zinc-900 dark:text-white">
                                {client.name}
                              </p>
                              <p className="text-zinc-500 dark:text-zinc-400">
                                Added{" "}
                                {new Date(
                                  client.created_at,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                            {client.company || "—"}
                          </td>

                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <p className="text-zinc-700 dark:text-zinc-300">
                                {client.email}
                              </p>
                              <p className="text-zinc-500 dark:text-zinc-400">
                                {client.phone}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                            {client._count.projects}
                          </td>

                          <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                            {client._count.interactionLogs}
                          </td>

                          <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                            {client._count.reminders}
                          </td>

                          <td className="max-w-70 px-6 py-4 text-zinc-600 dark:text-zinc-400">
                            <p className="line-clamp-2">
                              {client.notes || "No notes"}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile / tablet cards */}
              <div className="grid grid-cols-1 gap-5 xl:hidden md:grid-cols-2">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                          {client.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          Added{" "}
                          {new Date(client.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {client._count.projects} Projects
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                        <Mail size={16} className="text-zinc-500" />
                        <span className="break-all">{client.email}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                        <Phone size={16} className="text-zinc-500" />
                        <span>{client.phone}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                        <Building2 size={16} className="text-zinc-500" />
                        <span>{client.company || "No company"}</span>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-zinc-50 p-3 text-center dark:bg-zinc-800/60">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Projects
                        </p>
                        <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                          {client._count.projects}
                        </p>
                      </div>

                      <div className="rounded-xl bg-zinc-50 p-3 text-center dark:bg-zinc-800/60">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Logs
                        </p>
                        <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                          {client._count.interactionLogs}
                        </p>
                      </div>

                      <div className="rounded-xl bg-zinc-50 p-3 text-center dark:bg-zinc-800/60">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Reminders
                        </p>
                        <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                          {client._count.reminders}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                      <p className="mb-1 text-sm font-medium text-zinc-900 dark:text-white">
                        Notes
                      </p>
                      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {client.notes || "No notes added for this client."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Clients;
