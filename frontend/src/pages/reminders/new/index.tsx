import PageMetadata from "@/common/PageMetadata";
import CreateReminder from "@/features/reminders/create";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const CreateReminderPage = () => {
  return (
    <>
      <PageMetadata title={`Create Reminder`} />
      <CreateReminder />
    </>
  );
};

export default CreateReminderPage;

CreateReminderPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
