import { CalendarDays } from "lucide-react";
import { useRef } from "react";

type Props = {
  label: string;
  name: string;
  register: any;
  errors: any;
};

const DateInput = ({ label, name, register, errors }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenPicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.(); // modern browsers
      inputRef.current.focus(); // fallback
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-zinc-300">
        {label}
      </label>

      <div className="relative cursor-pointer" onClick={handleOpenPicker}>
        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="date"
          {...register(name, {
            required: `${label} is required`,
          })}
          ref={(e) => {
            register(name).ref(e);
            inputRef.current = e;
          }}
          className="w-full cursor-pointer rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
        />
      </div>

      {errors[name] && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default DateInput;
