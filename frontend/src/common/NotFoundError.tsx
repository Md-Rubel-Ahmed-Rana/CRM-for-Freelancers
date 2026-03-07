import Link from "next/link";
import { Home } from "lucide-react";

export default function PageNotFound404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-red-500">404</h1>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Page Not Found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
        >
          <Home size={18} />
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
