import PageMetadata from "@/common/PageMetadata";
import ChangePassword from "@/features/changePassword";
import DashboardLayout from "@/layout/DashboardLayout";
import { ReactElement } from "react";

const ChangePasswordPage = () => {
  return (
    <>
      <PageMetadata title={`Change Password`} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordPage;

ChangePasswordPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout component={page} />;
};
