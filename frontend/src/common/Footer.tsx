import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo + Description */}
          <div>
            <h3 className="text-xl font-bold">MiniCRM</h3>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              A simple CRM designed for freelancers to manage clients, projects,
              reminders, and interactions in one place.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-blue-600">
                  Features
                </Link>
              </li>

              <li>
                <Link href="#workflow" className="hover:text-blue-600">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/auth/register" className="hover:text-blue-600">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} MiniCRM. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
