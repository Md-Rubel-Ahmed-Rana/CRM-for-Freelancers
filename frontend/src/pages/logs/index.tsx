import PageMetadata from "@/common/PageMetadata";
import InteractionLogs from "@/features/interactionLogs";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const LogsPage = () => {
  return (
    <>
      <PageMetadata title={`Interaction Logs`} />
      <InteractionLogs />
    </>
  );
};

export default LogsPage;

LogsPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
