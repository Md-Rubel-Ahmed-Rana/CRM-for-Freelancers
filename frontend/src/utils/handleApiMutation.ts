import { toast } from "react-toastify";
import handleValidationErrors from "./handleValidationErrors";

export const handleApiMutation = async <TPayload>(
  mutationTrigger: (payload: TPayload) => any,
  payload: TPayload,
  successStatusCode: number,
  customMessages: {
    error?: string;
    success?: string;
  } = {},
): Promise<{ success: boolean }> => {
  try {
    const res = await mutationTrigger(payload).unwrap(); // ⭐ important

    if (res?.statusCode === successStatusCode) {
      toast.success(
        res?.message || customMessages.success || "Operation succeeded",
      );

      return { success: true };
    }

    toast.error(customMessages.error || "Operation failed");
    return { success: false };
  } catch (err: any) {
    toast.error(
      err?.data?.message ||
        err?.error ||
        customMessages.error ||
        "Something went wrong",
    );

    handleValidationErrors(err);

    return { success: false };
  }
};
