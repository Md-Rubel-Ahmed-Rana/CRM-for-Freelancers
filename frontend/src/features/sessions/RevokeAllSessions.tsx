import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useLogoutAllMutation } from "../auth/api";

const RevokeAllSessions = () => {
  const [logoutAll, { isLoading }] = useLogoutAllMutation();
  const handleLogoutAll = async () => {
    Swal.fire({
      title: "Revoke all sessions?",
      html: `<section className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/30">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-red-100 p-2 dark:bg-red-900/40">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>

            <div>
              <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                This will immediately log you out from <strong>all devices</strong>, including your current session.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-red-200 bg-white p-4 text-sm text-gray-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300">
            <p className="font-medium text-red-600 dark:text-red-400">
              <b>⚠️ Important:</b>
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>You will be logged out from all browsers and devices including your current session</li>
              <li>This action cannot be undone</li>
            </ul>
          </div>
        </section>`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes, logout all",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await logoutAll({}).unwrap();
        if (response.success) {
          toast.success(
            "You have been logged out from all devices successfully",
          );
          window.location.href = "/auth/login";
        } else {
          toast.error("Failed to log out from all devices. Please try again.");
        }
      } else {
        toast.info("Logout from all devices cancelled");
      }
    });
  };

  return (
    <div className="mt-5 flex justify-end">
      {isLoading ? (
        <button className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] cursor-not-allowed">
          Logging out from all devices...
        </button>
      ) : (
        <button
          onClick={handleLogoutAll}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout from all Devices
        </button>
      )}
    </div>
  );
};

export default RevokeAllSessions;
