import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full py-24 ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Manage Clients & Projects
          <span className="text-blue-600"> Without the Chaos</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          MiniCRM helps freelancers organize clients, track projects, log
          interactions, and manage reminders in one simple dashboard.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Get Started Free
          </button>

          <button className="px-6 py-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            View Demo
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-5xl rounded-xl border shadow-lg overflow-hidden">
            <Image
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              width={1200}
              height={700}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
