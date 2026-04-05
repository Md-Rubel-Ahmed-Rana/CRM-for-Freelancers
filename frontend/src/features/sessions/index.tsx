import { useGetSessionsQuery } from "../auth/api";
import { ISession } from "./types";
import SessionLoadingSkeleton from "./SessionLoadingSkeleton";
import SessionErrorDisplayer from "./SessionErrorDisplayer";
import SessionsTable from "./SessionsTable";
import NoSessionFound from "./NoSessionFound";

type Props = {
  currentSessionId: string;
};

const Sessions = ({ currentSessionId }: Props) => {
  const { data, isLoading, error } = useGetSessionsQuery({});

  const sessions = (data?.data?.data ?? []) as ISession[];

  if (isLoading) {
    return <SessionLoadingSkeleton />;
  }

  if (error) {
    return <SessionErrorDisplayer />;
  }

  return (
    <section className="space-y-2 rounded-xl  bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Device Activity
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage devices where your account is currently signed in.
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
          Logout from all Devices
        </div>
      </div>

      {sessions.length === 0 ? (
        <NoSessionFound />
      ) : (
        <SessionsTable
          sessions={sessions}
          currentSessionId={currentSessionId}
        />
      )}
    </section>
  );
};

export default Sessions;
