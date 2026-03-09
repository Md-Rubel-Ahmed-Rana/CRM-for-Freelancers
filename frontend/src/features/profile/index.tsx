/* eslint-disable react-hooks/exhaustive-deps */
import {
  Mail,
  ShieldCheck,
  Clock,
  Calendar,
  KeyRound,
  CheckCircle,
} from "lucide-react";
import { IUser } from "../auth/types";
import { useGetLoggedInUserQuery } from "../auth/api";
import { useEffect } from "react";

type Props = {
  setName: (name: string) => void;
};

const Profile = ({ setName }: Props) => {
  const { data } = useGetLoggedInUserQuery({});
  const user: IUser = data?.data?.user || { name: "" };

  useEffect(() => {
    if (user && user.name) {
      setName(user?.name);
    }
  }, [user]);

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className=" shadow-lg rounded-xl border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-5 p-6 border-b border-gray-200 dark:border-zinc-800">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
            {initials}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Auth Provider</p>
              <p className="font-medium">{user.auth_provider}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="font-medium">
                {new Date(user.created_at).toDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="font-medium">
                {" "}
                {new Date(user.last_login_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="font-medium text-green-600">
                {user.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="font-medium">
                {user.has_password
                  ? "Password has set"
                  : "Not Set Password Yet"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-zinc-800 flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>

          <button className="px-4 py-2 text-sm border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
