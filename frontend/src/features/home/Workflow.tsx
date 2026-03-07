const steps = [
  {
    title: "Add Your Clients",
    description:
      "Store all client information including name, email, phone, company and notes.",
  },
  {
    title: "Create Projects",
    description:
      "Attach projects to clients, set budgets, deadlines, and track project status.",
  },
  {
    title: "Track Progress",
    description:
      "Log meetings, calls, and reminders so you never miss important updates.",
  },
];

const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">How MiniCRM Works</h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Manage your freelance business in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Step Number */}
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {index + 1}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
