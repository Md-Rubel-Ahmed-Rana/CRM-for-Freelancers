import ClientClientForm from "./form";

const CreateClientForm = () => {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Create Client
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
          Add a new client with their contact details and optional business
          notes.
        </p>
      </div>

      <ClientClientForm />
    </section>
  );
};

export default CreateClientForm;
