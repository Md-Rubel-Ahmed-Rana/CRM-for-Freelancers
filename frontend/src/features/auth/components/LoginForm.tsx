import { useForm } from "react-hook-form";
import { ILogin } from "../types";
import PasswordInput from "@/components/PasswordInput";
import { useUserLoginMutation } from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { toast } from "react-toastify";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const [login, { isLoading }] = useUserLoginMutation();
  const router = useRouter();

  const handleLogin = async (data: ILogin) => {
    try {
      const result = await login(data).unwrap();
      if (result?.statusCode === 200) {
        toast.success(result?.message || "User logged in successful");
        router.push("/profile");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to login. Please try again",
        );
      }
      handleValidationErrors(result);
    } catch (error) {
      handleValidationErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
          disabled={isLoading}
        />

        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <PasswordInput<ILogin>
        name="password"
        register={register}
        errors={errors}
        isDisabled={isLoading}
      />

      <div className="flex justify-end text-sm">
        <Link
          href="/forgot-password"
          className="text-indigo-600 hover:text-indigo-700"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
