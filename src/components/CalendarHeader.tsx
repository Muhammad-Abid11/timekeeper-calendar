import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevMonth}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h2 className="text-lg font-semibold">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <Button
        variant="outline"
        size="icon"
        onClick={onNextMonth}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CalendarHeader;