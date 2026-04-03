import { useLogoutMutation } from "@/features/auth/api";
import { LoaderCircle, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Logout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    const response = await logout({}).unwrap();
    if (response.success) {
      toast.success("Logged out successfully");
      window.location.href = "/auth/login";
    } else {
      toast.error("Failed to log out");
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin h-6 w-6 text-gray-600" />
      ) : (
        <LogOut size={18} />
      )}
    </button>
  );
};

export default Logout;
