const Dashboard = () => {
  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Clients
          </p>
          <h2 className="mt-2 text-3xl font-bold">24</h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Projects
          </p>
          <h2 className="mt-2 text-3xl font-bold">12</h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Reminders Due
          </p>
          <h2 className="mt-2 text-3xl font-bold">5</h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Active Projects
          </p>
          <h2 className="mt-2 text-3xl font-bold">8</h2>
        </div>
      </div>

      {/* Lower content */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Main content */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Dashboard Content</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Put your charts, client summary, recent projects, and activity
              logs here.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Recent Clients
              </div>
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Project Status
              </div>
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Weekly Logs
              </div>
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Revenue / Budget
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Client meeting at 4 PM
              </div>
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Submit project proposal
              </div>
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800">
                Follow up with new lead
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
