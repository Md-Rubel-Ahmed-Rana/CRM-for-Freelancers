const features = [
  {
    title: "Client Management",
    description:
      "Organize all your clients in one place with contact info, company details, and notes.",
  },
  {
    title: "Project Tracking",
    description:
      "Track project budgets, deadlines, and statuses without messy spreadsheets.",
  },
  {
    title: "Smart Reminders",
    description:
      "Never miss a meeting or deadline with built-in reminders and interaction logs.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Powerful tools for freelancers</h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Everything you need to manage clients, projects and deadlines in one
            place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl hover:shadow-lg transition"
            >
              <div className="text-lg font-semibold">{feature.title}</div>

              <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
