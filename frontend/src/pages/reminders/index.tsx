import PageMetadata from "@/common/PageMetadata";
import Reminders from "@/features/reminders";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const RemindersPage = () => {
  return (
    <>
      <PageMetadata title={`Reminders`} />
      <Reminders />
    </>
  );
};

export default RemindersPage;

RemindersPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
