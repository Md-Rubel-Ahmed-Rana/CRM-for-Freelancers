/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { useGetAllProjectsQuery } from "./api";
import { TProjectsApiResponse } from "./types";
import ProjectLoadingSkeleton from "./ProjectLoadingSkeleton";
import ProjectsSummaryCards from "./ProjectsSummaryCards";
import ProjectsSearchFilters from "./ProjectsSearchFilters";
import ProjectsTable from "./ProjectsTable";
import ProjectsCards from "./ProjectsCards";
import PageHeader from "@/components/PageHeader";
import DataFetchErrorState from "@/components/DataFetchErrorState";
import NoDataFound from "@/components/NoDataFound";

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
  IN_PROGRESS:
    "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
  COMPLETED:
    "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  ON_HOLD:
    "bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
  CANCELLED:
    "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
};

export const getStatusClass = (status: string) =>
  statusStyles[status] ||
  "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-300 dark:ring-zinc-400/20";

export const formatProjectCurrency = (amount: number | string) => {
  const value = Number(amount || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatProjectDate = (date: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const isProjectOverdue = (deadline: string, status: string) => {
  if (!deadline) return false;
  if (status === "COMPLETED" || status === "CANCELLED") return false;
  return new Date(deadline) < new Date();
};

const Projects = () => {
  const { data, isLoading, isFetching, refetch, error } =
    useGetAllProjectsQuery({}) as {
      data?: TProjectsApiResponse;
      isLoading: boolean;
      isFetching: boolean;
      refetch: () => void;
      error?: any;
    };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const projects = data?.data?.data || [];
  const meta = data?.data?.meta;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        project.client?.company
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "ALL" || project.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, selectedStatus]);

  const totalBudget = filteredProjects.reduce(
    (sum, item) => sum + Number(item.budget || 0),
    0,
  );

  const completedCount = filteredProjects.filter(
    (item) => item.status === "COMPLETED",
  ).length;

  const activeCount = filteredProjects.filter(
    (item) => item.status === "IN_PROGRESS",
  ).length;

  if (isLoading) {
    return <ProjectLoadingSkeleton />;
  }

  if (error) {
    return (
      <DataFetchErrorState
        pageTitle="Projects"
        refetch={refetch}
        isRetrying={isLoading || isFetching}
        pageShortDescription="We couldn't fetch projects. There might be server error occur. Please try again!"
      />
    );
  }

  return (
    <section className="space-y-6">
      <PageHeader
        pageTitle="Projects"
        pageShortDescription="Manage all client projects with status, budget, and deadlines."
        newItemLink="/projects/new"
        refetch={refetch}
        isFetching={isFetching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search projects..."
        totalItems={meta?.total || projects.length}
      />

      <ProjectsSummaryCards
        activeCount={activeCount}
        completedCount={completedCount}
        filteredProjects={filteredProjects}
        meta={meta}
        totalBudget={totalBudget}
      />

      <ProjectsSearchFilters
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        setSearchTerm={setSearchTerm}
        setSelectedStatus={setSelectedStatus}
      />

      {filteredProjects.length === 0 ? (
        <NoDataFound title="Projects" />
      ) : (
        <>
          <ProjectsTable projects={filteredProjects} />

          <ProjectsCards projects={filteredProjects} />
        </>
      )}
    </section>
  );
};

export default Projects;
