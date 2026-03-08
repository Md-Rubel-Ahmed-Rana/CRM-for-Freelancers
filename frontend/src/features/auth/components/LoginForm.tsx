import { useForm } from "react-hook-form";
import { ILogin } from "../types";
import PasswordInput from "@/components/PasswordInput";
import { useUserLoginMutation } from "../api";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/router";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>();
  const [login] = useUserLoginMutation();
  const router = useRouter();

  const handleLogin = async (data: ILogin) => {
    await handleApiMutation(
      login,
      data,
      200,
      {
        error: "Failed to login. Please try again",
        success: "User logged in successful",
      },
      { isRedirect: true, path: "/dashboard", router },
    );
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium  mb-1">Email Address</label>

        <input
          type="email"
          placeholder="john@example.com"
          className="w-full rounded-lg border border-gray-300  px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          })}
        />

        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <PasswordInput<ILogin>
        name="password"
        register={register}
        errors={errors}
      />

      {/* Forgot Password */}
      <div className="flex justify-end text-sm">
        <a
          href="/forgot-password"
          className="text-indigo-600 hover:text-indigo-700"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
