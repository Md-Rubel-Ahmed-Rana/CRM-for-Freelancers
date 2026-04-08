import { Plus, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  pageTitle: string;
  pageShortDescription?: string;
  newItemLink?: string;
  refetch: () => void;
  isFetching: boolean;
  searchTerm: string | undefined;
  setSearchTerm: (searchTerm: string | undefined) => void;
  searchPlaceholder?: string;
  totalItems?: number;
};

const PageHeader = ({
  pageTitle,
  pageShortDescription,
  newItemLink,
  isFetching,
  refetch,
  setSearchTerm,
  searchPlaceholder = "Search...",
  totalItems,
}: Props) => {
  const singularTitle = pageTitle.toLowerCase().endsWith("s")
    ? pageTitle.slice(0, -1)
    : pageTitle;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue.trim() === "" ? undefined : inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pageTitle}{" "}
          {typeof totalItems === "number" && (
            <span className="text-md font-normal text-gray-500 dark:text-gray-400">
              ({totalItems})
            </span>
          )}
        </h1>
        {pageShortDescription && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {pageShortDescription}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-[320px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={inputValue}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500"
          />
        </div>
        <button
          title="Refresh"
          onClick={refetch}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
        </button>

        <Link
          href={newItemLink || "#"}
          title={`Add ${singularTitle || "Item"}`}
        >
          <button className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 cursor-pointer">
            <Plus className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageHeader;
