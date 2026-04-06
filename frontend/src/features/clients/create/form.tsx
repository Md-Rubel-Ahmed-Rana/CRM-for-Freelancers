import Link from "next/link";
import { useForm } from "react-hook-form";
import { IClientFormValues } from "../types";
import { useCreateClientMutation } from "../api";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/dist/client/components/navigation";

const ClientClientForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IClientFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const [createClient, { isLoading }] = useCreateClientMutation();
  const router = useRouter();

  const handleCreateNewClient = async (data: IClientFormValues) => {
    console.log(data);
    const { success } = await handleApiMutation(createClient, data, 201, {
      error: "Failed to create client. Please check the form and try again.",
      success: "Client created successfully!",
    });
    if (success) {
      reset();
      router.push("/clients");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateNewClient)} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition dark:bg-zinc-950 dark:text-white ${
              errors.name
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gray-400 dark:border-zinc-700 dark:focus:border-zinc-500"
            }`}
            {...register("name", {
              required: "Client name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition dark:bg-zinc-950 dark:text-white ${
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gray-400 dark:border-zinc-700 dark:focus:border-zinc-500"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="text"
            placeholder="+8801XXXXXXXXX"
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition dark:bg-zinc-950 dark:text-white ${
              errors.phone
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-300 focus:border-gray-400 dark:border-zinc-700 dark:focus:border-zinc-500"
            }`}
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 6,
                message: "Phone number is too short",
              },
            })}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="Acme Inc."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
            {...register("company")}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
        >
          Notes
        </label>
        <textarea
          id="notes"
          rows={5}
          placeholder="Add extra details about this client..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
          {...register("notes")}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-end">
        <Link href="/clients" className="w-full sm:w-auto">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => reset()}
            className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Cancel
          </button>
        </Link>

        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-zinc-200 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isLoading ? "Creating..." : "Create Client"}
        </button>
      </div>
    </form>
  );
};

export default ClientClientForm;
