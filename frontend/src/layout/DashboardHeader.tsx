import Logout from "@/common/Logout";
import { useGetLoggedInUserQuery } from "@/features/auth/api";
import { IUser } from "@/features/auth/types";

const DashboardHeader = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user: IUser = data?.data?.user || {};
  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-black">
          {user.name?.slice(0, 2)?.toUpperCase() || "U"}
        </div>

        <div>
          <h1 className="text-lg font-semibold">{user.name}</h1>
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
