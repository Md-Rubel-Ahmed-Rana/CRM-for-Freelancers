import Head from "next/head";

const defaultTitle = "Home";
const defaultDescription =
  "CRM for freelancers to manage clients, projects, reminders, and interactions efficiently with a modern responsive dashboard.";
const defaultKeywords =
  "freelancer crm, mini crm, client management system, project management for freelancers, freelancer dashboard";

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
};

const PageMetadata = ({
  title = defaultTitle,
  description,
  keywords,
}: Props) => {
  return (
    <Head>
      <title>{`${title} - CRM for Freelancers | Manage Clients, Projects & Reminders`}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
    </Head>
  );
};

export default PageMetadata;
