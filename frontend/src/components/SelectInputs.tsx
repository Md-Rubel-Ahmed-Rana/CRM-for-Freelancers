type Props = {
  label: string;
  name: string;
  register: any;
  errors: any;
  options?: string[];
};

const SelectInputs = ({ label, name, register, errors, options }: Props) => {
  return (
    <div className="lg:col-span-2">
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300">
        {label}
      </label>
      <select
        {...register(name, {
          required: `${label} is required`,
        })}
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default SelectInputs;
