import { FolderKanban, Mail, MessageSquareMore, Users } from "lucide-react";
import { useMemo } from "react";
import { IInteraction } from "./types";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-3 text-gray-700 dark:bg-zinc-800 dark:text-zinc-200">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

type Props = {
  interactions: IInteraction[];
  total: number | undefined;
};

const InteractionsSummaryCards = ({ interactions, total }: Props) => {
  const stats = useMemo(() => {
    const calls = interactions.filter((item) => item.type === "CALL").length;
    const meetings = interactions.filter(
      (item) => item.type === "MEETING",
    ).length;
    const emails = interactions.filter((item) => item.type === "EMAIL").length;
    const uniqueClients = new Set(interactions.map((item) => item.client_id))
      .size;

    return {
      total: total ?? 0,
      calls,
      meetings,
      emails,
      uniqueClients,
    };
  }, [interactions, total]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Logs"
        value={stats.total}
        subtitle="All recorded interactions"
        icon={MessageSquareMore}
      />
      <StatCard
        title="Meetings"
        value={stats.meetings}
        subtitle="Scheduled or completed discussions"
        icon={Users}
      />
      <StatCard
        title="Emails"
        value={stats.emails}
        subtitle="Client email communication"
        icon={Mail}
      />
      <StatCard
        title="Active Clients"
        value={stats.uniqueClients}
        subtitle="Clients with logged activities"
        icon={FolderKanban}
      />
    </div>
  );
};

export default InteractionsSummaryCards;
