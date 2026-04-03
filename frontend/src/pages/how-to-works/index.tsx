import PageMetadata from "@/common/PageMetadata";
import WorkflowSection from "@/features/home/Workflow";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const HowToWorkPage = () => {
  return (
    <>
      <PageMetadata
        title="How It Works - Mini CRM for Freelancers"
        description="Learn how Mini CRM can help you manage your freelance business more efficiently."
        keywords="how it works, freelancer crm, project management, client management"
      />

      <main className="min-h-[70vh] flex items-center justify-center">
        <WorkflowSection paddingY="py-10" />
      </main>
    </>
  );
};

export default HowToWorkPage;

HowToWorkPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
