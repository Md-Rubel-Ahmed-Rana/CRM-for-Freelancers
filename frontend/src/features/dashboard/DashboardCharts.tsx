import dynamic from "next/dynamic";
import ProjectsStatusSummary from "./ProjectsStatusSummary";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  summary?: {
    totalProjects: number;
    totalActiveProjects: number;
    totalDueReminders: number;
    totalClients: number;
  };
  projectsByStatus: {
    status: string;
    count: number;
  }[];
  chartsData: any;
  cardBase: string;
};

const DashboardCharts = ({
  summary,
  projectsByStatus,
  chartsData,
  cardBase,
}: Props) => {
  const pieChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    labels:
      chartsData?.projectStatusPie?.labels?.map((label: string) =>
        label.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      ) ?? [],
    legend: {
      position: "bottom",
      fontSize: "13px",
      labels: {
        colors: undefined,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "66%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Projects",
              formatter: () => `${summary?.totalProjects ?? 0}`,
            },
          },
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const barChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      // should replace underscore with space and capitalize first letter of each word
      categories:
        chartsData?.projectStatusPie?.labels?.map((label: string) =>
          label.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        ) ?? [],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  };
  return (
    <div className="space-y-6 xl:col-span-2">
      {/* Project status chart */}
      <div className={cardBase}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Projects by Status
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Visual breakdown of all project states.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 p-3 dark:border-zinc-800">
            <Chart
              options={pieChartOptions}
              series={chartsData?.projectStatusPie?.series ?? []}
              type="donut"
              height={320}
            />
          </div>

          <div className="rounded-2xl border border-gray-100 p-3 dark:border-zinc-800">
            <Chart
              options={barChartOptions}
              series={[
                {
                  name: "Projects",
                  data: chartsData?.projectStatusPie?.series ?? [],
                },
              ]}
              type="bar"
              height={320}
            />
          </div>
        </div>
      </div>

      {/* Status summary list */}
      <ProjectsStatusSummary
        projectsByStatus={projectsByStatus}
        cardBase={cardBase}
      />
    </div>
  );
};

export default DashboardCharts;
