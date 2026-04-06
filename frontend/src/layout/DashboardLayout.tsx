import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type Props = {
  component: React.ReactNode;
};

const DashboardLayout = ({ component }: Props) => {
  return (
    <div className="h-screen overflow-hidden bg-gray-100 text-gray-900 dark:bg-zinc-950 dark:text-white">
      <div className="flex h-full flex-col lg:flex-row">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:shrink-0">
          <DashboardSidebar />
        </aside>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="sticky top-0 z-40 shrink-0">
            <DashboardHeader />
          </div>

          <main className="flex-1 overflow-y-auto p-2">{component}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
