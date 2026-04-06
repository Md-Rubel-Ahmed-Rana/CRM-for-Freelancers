import PageMetadata from "@/common/PageMetadata";
import CreateClient from "@/features/clients/create";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const CreateClientPage = () => {
  return (
    <>
      <PageMetadata title={`Add New Clients`} />
      <CreateClient />
    </>
  );
};

export default CreateClientPage;

CreateClientPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
