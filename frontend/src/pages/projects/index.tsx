import PageMetadata from "@/common/PageMetadata";
import Projects from "@/features/projects";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const ProjectsPage = () => {
  return (
    <>
      <PageMetadata title={`Projects`} />
      <Projects />
    </>
  );
};

export default ProjectsPage;

ProjectsPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
