import Link from "next/link";
import { Edit3, KeyRound, ChevronRight } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Account</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-700 dark:text-gray-200">Profile</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-sm">
              M
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                My Profile
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your personal information and account security settings.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 self-start lg:self-auto">
          <Link
            href="/profile/edit"
            aria-label="Edit Profile"
            title="Edit Profile"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
          >
            <Edit3 className="h-5 w-5 transition group-hover:scale-110" />
          </Link>

          <Link
            href="/profile/change-password"
            aria-label="Change Password"
            title="Change Password"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-amber-500 dark:hover:bg-zinc-800 dark:hover:text-amber-400"
          >
            <KeyRound className="h-5 w-5 transition group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
