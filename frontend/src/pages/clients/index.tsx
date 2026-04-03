import PageMetadata from "@/common/PageMetadata";
import Clients from "@/features/clients";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const ClientsPage = () => {
  return (
    <>
      <PageMetadata title={`Clients`} />
      <Clients />
    </>
  );
};

export default ClientsPage;

ClientsPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
