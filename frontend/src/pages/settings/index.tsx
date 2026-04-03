import PageMetadata from "@/common/PageMetadata";
import Settings from "@/features/settings";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const SettingsPage = () => {
  return (
    <>
      <PageMetadata title={`Settings`} />
      <Settings />
    </>
  );
};

export default SettingsPage;

SettingsPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
