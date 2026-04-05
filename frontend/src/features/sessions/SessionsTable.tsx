import { Monitor, Smartphone, LogOut, Trash2 } from "lucide-react";
import { ISession } from "./types";

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getDeviceIcon = (deviceName: string) => {
  const lower = deviceName.toLowerCase();

  if (
    lower.includes("iphone") ||
    lower.includes("android") ||
    lower.includes("mobile")
  ) {
    return <Smartphone className="h-4 w-4" />;
  }

  return <Monitor className="h-4 w-4" />;
};

const getShortDeviceName = (deviceName: string) => {
  const lower = deviceName.toLowerCase();

  if (lower.includes("edg")) return "Microsoft Edge";
  if (lower.includes("chrome")) return "Chrome Browser";
  if (lower.includes("firefox")) return "Firefox Browser";
  if (lower.includes("safari")) return "Safari Browser";
  if (lower.includes("postman")) return "Postman";
  return "Unknown Device";
};

type Props = {
  sessions: ISession[];
  currentSessionId?: string;
  onLogoutSession?: (session: ISession) => void;
};

const SessionsTable = ({
  sessions,
  currentSessionId,
  onLogoutSession,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-zinc-950/40">
            <tr className="text-left">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Device
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Signed In
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((session) => {
              const isCurrent = currentSessionId === session.id;
              const isActive = session.status === "active";

              return (
                <tr
                  key={session.id}
                  className="border-t border-gray-200 transition hover:bg-gray-50/70 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {getDeviceIcon(session.deviceName)}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {getShortDeviceName(session.deviceName)}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400 max-w-70">
                          {session.deviceName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {formatDateTime(session.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        isCurrent
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                          : isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                      }`}
                    >
                      {isCurrent ? "Current Device" : session.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onLogoutSession?.(session)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                    >
                      {isCurrent ? (
                        <>
                          <LogOut className="h-4 w-4" />
                          Logout
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-gray-200 md:hidden dark:divide-zinc-800">
        {sessions.map((session) => {
          const isCurrent = currentSessionId === session.id;
          const isActive = session.status === "active";

          return (
            <div key={session.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    {getDeviceIcon(session.deviceName)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getShortDeviceName(session.deviceName)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 wrap-break-word">
                      {session.deviceName}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Signed in: {formatDateTime(session.createdAt)}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    isCurrent
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                  }`}
                >
                  {isCurrent ? "Current" : session.status}
                </span>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onLogoutSession?.(session)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  {isCurrent ? (
                    <>
                      <LogOut className="h-4 w-4" />
                      Logout Current Session
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Remove Session
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionsTable;
