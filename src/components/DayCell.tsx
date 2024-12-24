import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, CalendarCheck, CalendarX } from "lucide-react";

interface DayCellProps {
  date: Date;
  isToday: boolean;
  hasTimeEntry: boolean;
  timeIn?: string;
  timeOut?: string;
  onClick: () => void;
}

const DayCell = ({ 
  date, 
  isToday, 
  hasTimeEntry, 
  timeIn,
  timeOut,
  onClick 
}: DayCellProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-full w-full p-2 flex flex-col items-center justify-between space-y-1 hover:bg-slate-100 relative",
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
      
      {hasTimeEntry ? (
        <div className="flex items-center gap-1">
          <CalendarCheck className="w-4 h-4 text-green-500" />
          <Clock className="w-4 h-4 text-blue-500" />
        </div>
      ) : (
        <CalendarX className="w-4 h-4 text-gray-400" />
      )}
    </Button>
  );
};

export default DayCell;