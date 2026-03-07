import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24 bg-blue-600 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to organize your freelance business?
        </h2>

        {/* Description */}
        <p className="mt-6 text-blue-100 max-w-2xl mx-auto">
          Manage clients, track projects, log interactions, and set reminders —
          all from one simple dashboard.
        </p>

        {/* Button */}
        <div className="mt-10">
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
