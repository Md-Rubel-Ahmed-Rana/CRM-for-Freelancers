import LoginForm from "./LoginForm";
import { ShieldCheck, Cookie } from "lucide-react";

const Login = () => {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 space-y-6 border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <ShieldCheck className="w-10 h-10 text-indigo-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Login to access your freelancer CRM dashboard
        </p>
      </div>

      {/* Cookie Notice */}
      <div className="flex items-start gap-2 text-xs bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
        <Cookie className="w-4 h-4 text-yellow-600 mt-0.5" />

        <p className="text-yellow-700 dark:text-yellow-400">
          Please ensure your browser allows cookies for secure authentication.
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?{" "}
        <a
          href="/auth/register"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Create one
        </a>
      </div>
    </div>
  );
};

export default Login;
