import { ShieldCheck, Cookie } from "lucide-react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <div className="w-full max-w-md shadow-lg rounded-xl p-8 space-y-6 border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <ShieldCheck className="w-10 h-10 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Register to start managing your freelance clients and projects
        </p>
      </div>

      {/* Cookie Notice */}
      <div className="flex items-start gap-2 text-xs bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
        <Cookie className="w-4 h-4 text-yellow-600 mt-0.5" />

        <p>
          Please ensure your browser allows cookies for secure authentication
          and session management.
        </p>
      </div>

      {/* Register Form */}
      <RegisterForm />

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
