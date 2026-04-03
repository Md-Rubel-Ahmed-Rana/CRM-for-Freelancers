import PageMetadata from "@/common/PageMetadata";
import FeaturesSection from "@/features/home/Features";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const FeaturesPage = () => {
  return (
    <>
      <PageMetadata
        title="Features - Mini CRM for Freelancers"
        description="Explore the features of Mini CRM and see how it can help you manage your freelance business more efficiently."
        keywords="crm features, freelancer crm, project management features, client management features, interaction tracking features, reminder management features"
      />

      <main className="min-h-[70vh] flex items-center justify-center">
        <FeaturesSection paddingY="py-10" />
      </main>
    </>
  );
};

export default FeaturesPage;

FeaturesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
