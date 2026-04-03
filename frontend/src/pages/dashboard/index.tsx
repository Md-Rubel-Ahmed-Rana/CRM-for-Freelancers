import PageMetadata from "@/common/PageMetadata";
import Dashboard from "@/features/dashboard";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const DashboardPage = () => {
  return (
    <>
      <PageMetadata title="Dashboard" />
      <Dashboard />
    </>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
