import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface DayCellProps {
  date: Date;
  isToday: boolean;
  hasTimeEntry: boolean;
  onClick: () => void;
}

const DayCell = ({ date, isToday, hasTimeEntry, onClick }: DayCellProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-full w-full p-2 flex flex-col items-center justify-start space-y-1 hover:bg-slate-100 relative",
        isToday && "bg-blue-50 hover:bg-blue-100",
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "text-sm font-medium",
          isToday && "text-blue-600"
        )}
      >
        {format(date, "d")}
      </span>
      {hasTimeEntry && (
        <Clock className="w-4 h-4 text-blue-500 absolute bottom-1 right-1" />
      )}
    </Button>
  );
};

export default DayCell;