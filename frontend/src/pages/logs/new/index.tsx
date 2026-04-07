import PageMetadata from "@/common/PageMetadata";
import CreateInteractionLog from "@/features/interactionLogs/create";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const CreateInteractionLogPage = () => {
  return (
    <>
      <PageMetadata title={`Create Interaction Log`} />
      <CreateInteractionLog />
    </>
  );
};

export default CreateInteractionLogPage;

CreateInteractionLogPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
