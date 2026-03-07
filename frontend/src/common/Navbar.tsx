import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white dark:bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight">MiniCRM</div>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="#features" className="hover:text-blue-600">
            Features
          </Link>

          <Link href="#workflow" className="hover:text-blue-600">
            How it works
          </Link>

          <Link href="/login">Login</Link>

          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
