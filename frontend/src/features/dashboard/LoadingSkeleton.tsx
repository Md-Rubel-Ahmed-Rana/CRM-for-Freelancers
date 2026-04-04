type Props = {
  cardBase?: string;
};
const LoadingSkeleton = ({ cardBase }: Props) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className={`${cardBase} animate-pulse`}>
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="mt-4 h-8 w-20 rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className={`${cardBase} h-105 animate-pulse`}>
            <div className="h-full rounded-xl bg-gray-100 dark:bg-zinc-800" />
          </div>
        </div>
        <div>
          <div className={`${cardBase} h-105 animate-pulse`}>
            <div className="h-full rounded-xl bg-gray-100 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
