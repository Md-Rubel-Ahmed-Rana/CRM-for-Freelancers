import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type Props = {
  component: React.ReactNode;
};

const DashboardLayout = ({ component }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-zinc-950 dark:text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <DashboardSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          {/* headers top bar  */}
          <DashboardHeader />

          {/* // dynamic content  */}
          <main className="flex-1 p-2">{component}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
