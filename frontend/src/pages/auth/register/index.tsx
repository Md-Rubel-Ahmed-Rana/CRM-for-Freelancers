import PageMetadata from "@/common/PageMetadata";
import Register from "@/features/auth/components/Register";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const RegisterPage = () => {
  return (
    <>
      <PageMetadata
        title="Register - Mini CRM for Freelancers"
        description="Login to your Mini CRM dashboard to manage clients, projects, reminders, and interactions efficiently. Secure access for freelancers."
        keywords="crm login, freelancer crm login, project management crm, freelancer dashboard login, client management system"
      />

      <main className="min-h-screen flex items-center justify-center">
        <Register />
      </main>
    </>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
