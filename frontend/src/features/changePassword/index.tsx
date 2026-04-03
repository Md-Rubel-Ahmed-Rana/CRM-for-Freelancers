/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const ChangePassword = () => {
  const isLoading = false;

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

  const handleChangePassword = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Change Password
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Update your password to keep your account secure.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition ${
                errors.oldPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              {...register("oldPassword", {
                required: "Current password is required",
                minLength: {
                  value: 8,
                  message: "Current password must be at least 8 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Current password must be at most 15 characters",
                },
              })}
            />
            {errors.oldPassword && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition ${
                errors.newPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "New password must be at least 8 characters",
                },
                maxLength: {
                  value: 15,
                  message: "New password must be at most 15 characters",
                },
                validate: {
                  notSameAsOld: (value) =>
                    value !== oldPassword ||
                    "New password must be different from current password",
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "New password must contain at least one uppercase letter",
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "New password must contain at least one lowercase letter",
                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    "New password must contain at least one number",
                },
              })}
            />
            {errors.newPassword && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid || isSubmitting || isLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
