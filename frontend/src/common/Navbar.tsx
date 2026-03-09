import { useGetLoggedInUserQuery } from "@/features/auth/api";
import { IUser } from "@/features/auth/types";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user: IUser = data?.data?.user || {};
  return (
    <nav className="w-full border-b border-gray-500 sticky top-0 z-50">
      <div className=" px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="MiniCRM Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl font-bold tracking-tight">MiniCRM</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="#features" className="hover:text-blue-600">
            Features
          </Link>

          <Link href="#workflow" className="hover:text-blue-600">
            How it works
          </Link>

          {user && user.id ? (
            <>
              <Logout />
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>

              <Link
                href="/auth/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
