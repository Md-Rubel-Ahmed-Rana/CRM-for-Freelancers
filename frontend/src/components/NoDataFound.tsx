import { Frown, Plus } from "lucide-react";
import Link from "next/link";

interface NoDataFoundProps {
  title?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  title = "No data found.",
}) => {
  const singularTitle = title.toLowerCase().endsWith("s")
    ? title.slice(0, -1)
    : title;
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-75 p-6 rounded-2xl bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="mb-4 text-muted-foreground">
        <Frown className="w-16 h-16" />
      </div>
      <h1 className="text-muted-foreground text-2xl mb-1">{title}</h1>
      <div className="mt-4">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-lg font-semibold">
            You haven&apos;t added any {singularTitle.toLowerCase()} yet.
          </h3>
          <p className="text-muted-foreground">
            To add a new {singularTitle.toLowerCase()}, click the button below.
          </p>
          <Link href={`/${title.toLowerCase()}/new`}>
            <button className="border flex gap-1 items-center px-3 py-2 rounded-md justify-center cursor-pointer">
              <Plus className="h-5 w-5" />
              <span>Add {singularTitle}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
