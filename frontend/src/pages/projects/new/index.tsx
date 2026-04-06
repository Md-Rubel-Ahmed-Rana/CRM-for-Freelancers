import PageMetadata from "@/common/PageMetadata";
import CreateProject from "@/features/projects/create";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const CreateProjectPage = () => {
  return (
    <>
      <PageMetadata title={`Create Project`} />
      <CreateProject />
    </>
  );
};

export default CreateProjectPage;

CreateProjectPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
