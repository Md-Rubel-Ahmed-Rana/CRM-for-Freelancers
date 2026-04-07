import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleDollarSign, FileText, Save } from "lucide-react";
import { toast } from "react-toastify";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/dist/client/components/navigation";
import DateInput from "@/components/DateInput";
import { ICreateReminderFormValues } from "../types";
import { useCreateReminderMutation } from "../api";
import ClientsDropdown from "@/features/projects/create/clients-dropdown";
import ProjectsDropdown from "@/features/projects/projects-dropdown";
import CheckboxInput from "@/components/CheckboxInput";

const CreateReminderForm = () => {
  const [clientId, setClientId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateReminderFormValues>({
    defaultValues: {
      client_id: "",
      project_id: undefined,
      title: "",
      description: "",
      due_date: "",
      is_completed: false,
    },
  });

  const [createReminder, { isLoading }] = useCreateReminderMutation();
  const router = useRouter();

  const onSubmit = async (values: ICreateReminderFormValues) => {
    if (!clientId) {
      toast.error("Please select a client first.");
      return;
    }

    const payload: ICreateReminderFormValues = {
      client_id: clientId,
      project_id: values.project_id || undefined,
      title: values.title,
      description: values.description,
      is_completed: values.is_completed,
      due_date: new Date(values.due_date).toISOString(),
    };

    const { success } = await handleApiMutation(createReminder, payload, 201, {
      error: "Failed to create reminder. Please try again.",
      success: "Reminder created successfully!",
    });

    if (success) {
      router.push("/reminders");
    }
  };

  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-gray-200 p-2 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Project Details
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Enter the information below to create and assign a project.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <ClientsDropdown setClientId={setClientId} />
            {!clientId && (
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                Please select a client before submitting the project.
              </p>
            )}
          </div>
          <div className="lg:col-span-2">
            <ProjectsDropdown setProjectId={setProjectId} clientId={clientId} />
            {!projectId && (
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                Please select a project before submitting the reminder.
              </p>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300">
              Reminder Title
            </label>
            <div className="relative">
              <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Follow up with client about project proposal"
                {...register("title", {
                  required: "Reminder title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
              />
            </div>
            {errors.title && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex items-end justify-between gap-4 lg:col-span-2">
            <div className="w-full">
              <DateInput
                name="due_date"
                label="Due Date"
                register={register}
                errors={errors}
              />
            </div>

            <div className="w-full">
              <CheckboxInput
                name="is_completed"
                label="Mark as Completed"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
            ></label>
            <textarea
              id="description"
              rows={5}
              placeholder="Additional details about the reminder (optional)"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
              {...register("description")}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end dark:border-zinc-800">
          <button
            disabled={isLoading}
            type="button"
            onClick={() => router.push("/projects")}
            className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl  px-5 py-3 text-sm font-semibold text-white transition   ${isLoading ? "cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"} `}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Creating..." : "Create Reminder"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateReminderForm;
