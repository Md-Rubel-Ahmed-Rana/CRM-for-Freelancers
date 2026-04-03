import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useGetSessionsQuery } from "../api";
import { ISession } from "../types";
import SessionCard from "./SessionCard";

const Sessions = () => {
  const { data, isLoading, error } = useGetSessionsQuery({});

  const sessions = (data?.data?.data ?? []) as ISession[];

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 text-gray-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-200">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Loading sessions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5" />
          <div>
            <h2 className="font-semibold">Failed to load sessions</h2>
            <p className="mt-1 text-sm">
              Something went wrong while fetching your active sessions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active Sessions
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage devices where your account is currently signed in.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
            Total Sessions: {sessions.length}
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <ShieldCheck className="mx-auto h-10 w-10 text-gray-400" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No sessions found
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You do not have any active sessions right now.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Sessions;
