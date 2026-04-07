type Props = {
  label: string;
  name: string;
  register: any;
  errors?: any;
  required?: boolean;
};

const CheckboxInput = ({
  label,
  name,
  register,
  errors,
  required = false,
}: Props) => {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3 transition hover:border-blue-400 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-blue-500">
        <input
          type="checkbox"
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:focus:ring-blue-500"
        />

        <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
          {label}
        </span>
      </label>

      {errors?.[name] && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default CheckboxInput;
