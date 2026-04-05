import { IUser } from "../auth/types";
import {
  Mail,
  ShieldCheck,
  Clock,
  Calendar,
  KeyRound,
  CheckCircle,
} from "lucide-react";

type Props = {
  user?: IUser;
  isLoading?: boolean;
};

const SkeletonText = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-200 dark:bg-zinc-800 ${className}`}
  />
);

const ProfileInfo = ({ user, isLoading }: Props) => {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Email */}
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Email</p>
          {isLoading ? (
            <SkeletonText className="h-4 w-40" />
          ) : (
            <p className="font-medium">{user?.email}</p>
          )}
        </div>
      </div>

      {/* Auth Provider */}
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Auth Provider</p>
          {isLoading ? (
            <SkeletonText className="h-4 w-28" />
          ) : (
            <p className="font-medium">{user?.auth_provider}</p>
          )}
        </div>
      </div>

      {/* Created */}
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Account Created</p>
          {isLoading ? (
            <SkeletonText className="h-4 w-36" />
          ) : (
            <p className="font-medium">
              {new Date(user!.created_at).toDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Last Login */}
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Last Login</p>
          {isLoading ? (
            <SkeletonText className="h-4 w-44" />
          ) : (
            <p className="font-medium">
              {new Date(user!.last_login_at).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Account Status</p>
          {isLoading ? (
            <SkeletonText className="h-4 w-20" />
          ) : (
            <p className="font-medium text-green-600">
              {user?.is_active ? "Active" : "Inactive"}
            </p>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="flex items-center gap-3">
        <KeyRound className="w-5 h-5 text-gray-500" />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Password</p>
          {isLoading ? (
            <SkeletonText className="h-4 w-36" />
          ) : (
            <p className="font-medium">
              {user?.has_password ? "Password has set" : "Not Set Password Yet"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
