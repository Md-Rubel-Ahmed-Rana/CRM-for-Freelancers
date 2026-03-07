import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className=" px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to organize your freelance business?
        </h2>

        {/* Description */}
        <p className="mt-6  max-w-2xl mx-auto">
          Manage clients, track projects, log interactions, and set reminders —
          all from one simple dashboard.
        </p>

        {/* Button */}
        <div className="mt-10">
          <Link
            href="/auth/register"
            className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
