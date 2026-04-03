/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../auth/api";
import { handleApiMutation } from "@/utils/handleApiMutation";
import PasswordInput from "@/components/PasswordInput";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const oldPassword = watch("oldPassword");

  const samePasswordError =
    oldPassword && watch("newPassword") === oldPassword
      ? "New password must be different from the old password"
      : "";

  const handleChangePassword = async (data: FormValues) => {
    const { success } = await handleApiMutation(changePassword, data, 200, {
      success: "Password changed successfully",
      error: "Failed to change password. Please try again.",
    });

    if (success) {
      window.location.href = "/auth/login";
    } else {
      toast.error("Failed to change password. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen   px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Change Password</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update your password to keep your account secure.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-5"
        >
          <PasswordInput
            name="oldPassword"
            label="Current Password"
            errors={errors}
            register={register}
            placeholder="Enter your old password"
            isDisabled={isLoading}
          />

          <PasswordInput
            name="newPassword"
            label="New Password"
            errors={errors}
            register={register}
            placeholder="Enter your new password"
            isDisabled={isLoading}
          />

          {samePasswordError && (
            <p className="text-sm text-red-600">{samePasswordError}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              disabled={!isValid || isSubmitting || isLoading}
              className="rounded-lg border border-gray-500 px-4 py-2 text-sm font-medium  transition hover:bg-gray-700 cursor-pointer text-white"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid || isSubmitting || isLoading}
              className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${samePasswordError ? "opacity-50" : ""} ${!isValid || isSubmitting || isLoading ? "opacity-50  cursor-not-allowed" : " cursor-pointer"} `}
            >
              {isLoading || isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
