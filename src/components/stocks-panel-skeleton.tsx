import { Skeleton } from "@/components/ui/skeleton";

export const StocksPanelSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-5">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col justify-center items-center gap-6">
          <Skeleton className="h-10 w-[500px]" />
          <Skeleton className="h-6 w-[300px]" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton className="h-90" />
            <Skeleton className="h-90" />
            <Skeleton className="h-90" />
            <Skeleton className="h-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
