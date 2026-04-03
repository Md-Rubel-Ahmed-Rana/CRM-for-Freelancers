import Logout from "@/common/Logout";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-black">
          RA
        </div>

        <div>
          <h1 className="text-lg font-semibold">Rubel Ahmed</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back to your dashboard
          </p>
        </div>
      </div>

      {/* Logout button */}
      <Logout />
    </header>
  );
};

export default DashboardHeader;
