import {
  CalendarDays,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Users,
} from "lucide-react";
import { IInteraction, IInteractionType } from "./types";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const formatDeadline = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
};

const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
};

const getInteractionConfig = (type: IInteractionType) => {
  switch (type) {
    case "CALL":
      return {
        label: "Call",
        icon: PhoneCall,
        badgeClass:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
        iconWrapClass:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
      };

    case "MEETING":
      return {
        label: "Meeting",
        icon: Users,
        badgeClass:
          "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300",
        iconWrapClass:
          "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
      };

    case "EMAIL":
      return {
        label: "Email",
        icon: Mail,
        badgeClass:
          "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300",
        iconWrapClass:
          "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
      };

    default:
      return {
        label: "Other",
        icon: MessageSquareMore,
        badgeClass:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
        iconWrapClass:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
      };
  }
};

const getProjectStatusClass = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300";
    case "IN_PROGRESS":
      return "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300";
    case "PLANNING":
      return "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300";
    case "ON_HOLD":
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
    case "CANCELLED":
      return "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

type Props = {
  interaction: IInteraction;
};

const InteractionCard = ({ interaction }: Props) => {
  const config = getInteractionConfig(interaction.type);
  const Icon = config.icon;
  return (
    <article
      key={interaction.id}
      className="group rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 flex-1 gap-4">
          <div
            className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:flex ${config.iconWrapClass}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
                  >
                    {config.label}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getProjectStatusClass(
                      interaction.project.status,
                    )}`}
                  >
                    {interaction.project.status.replaceAll("_", " ")}
                  </span>
                </div>

                <h2 className="mt-3 truncate text-lg font-semibold text-gray-900 dark:text-white">
                  {interaction.project.title}
                </h2>

                <div className="mt-2 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:flex-wrap sm:items-center">
                  <span className="font-medium text-gray-800 dark:text-zinc-200">
                    {interaction.client.name}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>{interaction.client.company || "No company"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{interaction.client.email}</span>
                </div>
              </div>

              <div className="shrink-0 rounded-2xl bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 dark:bg-zinc-800 dark:text-zinc-300">
                {formatDate(interaction.date)}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {interaction.notes}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800/70">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Client Phone
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {interaction.client.phone}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800/70">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Budget
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(interaction.project.budget)}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800/70">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Deadline
                </p>
                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  {formatDeadline(interaction.project.deadline)}
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800/70">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Client Note
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-800 dark:text-zinc-200">
                  {interaction.client.notes || "No client note added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default InteractionCard;
