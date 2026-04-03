import PageMetadata from "@/common/PageMetadata";
import Activities from "@/features/activities";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const ActivitiesPage = () => {
  return (
    <>
      <PageMetadata title={`Activities`} />
      <Activities />
    </>
  );
};

export default ActivitiesPage;

ActivitiesPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
