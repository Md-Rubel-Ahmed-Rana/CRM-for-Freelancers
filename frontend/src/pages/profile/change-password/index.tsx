import PageMetadata from "@/common/PageMetadata";
import ChangePassword from "@/features/changePassword";
import RootLayout from "@/layout/RootLayout";
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
  return <RootLayout>{page}</RootLayout>;
};
