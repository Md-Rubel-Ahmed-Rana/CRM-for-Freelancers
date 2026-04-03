import {
  Monitor,
  Smartphone,
  Globe,
  Clock3,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { ISession } from "../types";

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
    return <Smartphone className="h-5 w-5" />;
  }

  return <Monitor className="h-5 w-5" />;
};

const getShortDeviceName = (deviceName: string) => {
  if (deviceName.includes("Chrome")) return "Chrome Browser";
  if (deviceName.includes("Firefox")) return "Firefox Browser";
  if (deviceName.includes("Safari")) return "Safari Browser";
  if (deviceName.includes("Edge")) return "Microsoft Edge";
  return "Unknown Device";
};

type Props = {
  session: ISession;
};

const SessionCard = ({ session }: Props) => {
  const isActive = session.status === "active";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            {getDeviceIcon(session.deviceName)}
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {getShortDeviceName(session.deviceName)}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 break-all">
                {session.deviceName}
              </p>
            </div>

            <div className="grid gap-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span>IP: {session.ipAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-400" />
                <span>Signed in: {formatDateTime(session.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-gray-400" />
                <span>Last active: {formatDateTime(session.lastActiveAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gray-400" />
                <span>Expires: {formatDateTime(session.expiresAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {session.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
