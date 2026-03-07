import PageMetadata from "@/common/PageMetadata";
import Login from "@/features/auth/components/Login";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const LoginPage = () => {
  return (
    <>
      <PageMetadata
        title="Login - Mini CRM for Freelancers"
        description="Login to your Mini CRM dashboard to manage clients, projects, reminders, and interactions efficiently. Secure access for freelancers."
        keywords="crm login, freelancer crm login, project management crm, freelancer dashboard login, client management system"
      />

      <main className="min-h-screen flex items-center justify-center">
        <Login />
      </main>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
