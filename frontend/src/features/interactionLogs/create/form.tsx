import { useState } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/dist/client/components/navigation";
import DateInput from "@/components/DateInput";
import ClientsDropdown from "@/features/projects/create/clients-dropdown";
import ProjectsDropdown from "@/features/projects/projects-dropdown";
import { ICreateInteractionFormValues, interactionsTypes } from "../types";
import { useCreateInteractionMutation } from "../api";
import SelectInputs from "@/components/SelectInputs";

const CreateInteractionForm = () => {
  const [clientId, setClientId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateInteractionFormValues>({
    defaultValues: {
      client_id: "",
      project_id: undefined,
      date: "",
      type: "CALL",
      notes: "",
    },
  });

  const [createInteraction, { isLoading }] = useCreateInteractionMutation();
  const router = useRouter();

  const onSubmit = async (values: ICreateInteractionFormValues) => {
    if (!clientId) {
      toast.error("Please select a client first.");
      return;
    }

    const payload: ICreateInteractionFormValues = {
      client_id: clientId,
      project_id: projectId || undefined,
      type: values.type,
      notes: values.notes,
      date: new Date(values.date).toISOString(),
    };
    console.log({ payload });

    const { success } = await handleApiMutation(
      createInteraction,
      payload,
      201,
      {
        error: "Failed to create interaction. Please try again.",
        success: "Interaction created successfully!",
      },
    );

    if (success) {
      router.push("/logs");
    }
  };

  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-gray-200 p-2 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Interaction Details
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Enter the information below to create and assign an interaction.
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

          <div className="flex items-end justify-between gap-4 lg:col-span-2">
            <div className="w-full">
              <DateInput
                name="date"
                label="Date of Interaction"
                register={register}
                errors={errors}
              />
            </div>

            <div className="w-full">
              <SelectInputs
                label="Type of Interaction"
                name="type"
                register={register}
                errors={errors}
                options={interactionsTypes}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300"
            ></label>
            <textarea
              id="notes"
              rows={5}
              placeholder="Additional notes about the interaction..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-zinc-500"
              {...register("notes")}
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
            {isLoading ? "Creating..." : "Create Interaction"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateInteractionForm;
