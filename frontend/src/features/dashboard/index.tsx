import { useGetDashboardDataQuery } from "./api";
import SummaryCards from "./SummaryCards";
import DashboardSummaryHeader from "./DashboardSummaryHeader";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorDisplayer from "./ErrorDisplayer";
import QuickInsights from "./QuickInsights";
import UpcomingReminders from "./UpcomingReminders";
import DashboardCharts from "./DashboardCharts";

type TReminder = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
};

type TProjectStatusItem = {
  status: string;
  count: number;
};

type TDashboardResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  traceId: string;
  data: {
    data: {
      summary: {
        totalClients: number;
        totalProjects: number;
        totalDueReminders: number;
        totalActiveProjects: number;
      };
      upcomingReminders: TReminder[];
      projectsByStatus: TProjectStatusItem[];
      chartsData: {
        projectStatusPie: {
          labels: string[];
          series: number[];
        };
        remindersDueByDay: {
          labels: string[];
          series: number[];
        };
        projectsCreatedByMonth: {
          labels: string[];
          series: number[];
        };
      };
    };
  };
};

const cardBase =
  "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-900";

const Dashboard = () => {
  const { data, error, isLoading } = useGetDashboardDataQuery({}) as {
    data?: TDashboardResponse;
    error?: any;
    isLoading: boolean;
  };

  const dashboard = data?.data?.data;

  const summary = dashboard?.summary;
  const upcomingReminders = dashboard?.upcomingReminders ?? [];
  const projectsByStatus = dashboard?.projectsByStatus ?? [];
  const chartsData = dashboard?.chartsData;

  if (isLoading) {
    return <LoadingSkeleton cardBase={cardBase} />;
  }

  if (error || !dashboard) {
    return <ErrorDisplayer />;
  }

  return (
    <div className="space-y-2">
      <DashboardSummaryHeader />

      <SummaryCards cardBase={cardBase} summary={dashboard?.summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <DashboardCharts
          summary={summary}
          projectsByStatus={projectsByStatus}
          chartsData={chartsData}
          cardBase={cardBase}
        />

        {/* Right panel */}
        <div className="space-y-6">
          <UpcomingReminders
            upcomingReminders={upcomingReminders}
            cardBase={cardBase}
          />

          <QuickInsights cardBase={cardBase} summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
