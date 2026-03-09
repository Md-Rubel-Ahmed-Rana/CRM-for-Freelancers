import PageMetadata from "@/common/PageMetadata";
import Profile from "@/features/profile";
import RootLayout from "@/layout/RootLayout";
import { ReactElement, useState } from "react";

const ProfilePage = () => {
  const [name, setName] = useState<string | null>(null);
  return (
    <>
      <PageMetadata title={`Profile - ${name || "Page"}`} />
      <Profile setName={setName} />
    </>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
