import { useForm } from "react-hook-form";
import { IRegister } from "../types";
import PasswordInput from "@/components/PasswordInput";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useUserRegisterMutation } from "../api";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();
  const router = useRouter();

  const [registerMutation, { isLoading }] = useUserRegisterMutation();

  const handleRegister = async (data: IRegister) => {
    await handleApiMutation(
      registerMutation,
      data,
      201,
      {
        error: "Failed to register. Please try again",
        success: "User registered successful",
      },
      { isRedirect: true, path: "/dashboard", router },
    );
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium  mb-1">Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-lg border border-gray-300  px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
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

      <PasswordInput<IRegister>
        name="password"
        register={register}
        errors={errors}
      />

      <div className="flex justify-end text-sm">
        <a
          href="/forgot-password"
          className="text-indigo-600 hover:text-indigo-700"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
