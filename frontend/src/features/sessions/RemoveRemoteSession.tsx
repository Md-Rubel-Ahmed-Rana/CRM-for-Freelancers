import { Trash2 } from "lucide-react";
import { useRevokeSessionMutation } from "../auth/api";
import { toast } from "react-toastify/unstyled";

type Props = {
  id: string;
};
const RemoveRemoteSession = ({ id }: Props) => {
  const [revoke, { isLoading }] = useRevokeSessionMutation();
  const handleLogout = async () => {
    const response = await revoke(id).unwrap();
    if (response.success) {
      toast.success("Session revoked successfully");
    } else {
      toast.error("Failed to revoke session");
    }
  };
  return (
    <>
      {isLoading ? (
        <span className="text-sm text-gray-500">Revoking...</span>
      ) : (
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      )}
    </>
  );
};

export default RemoveRemoteSession;
