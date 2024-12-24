import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  format,
} from "date-fns";
import CalendarHeader from "@/components/CalendarHeader";
import DayCell from "@/components/DayCell";
import TimeEntryForm from "@/components/TimeEntryForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface TimeEntry {
  date: string;
  timeIn: string;
  timeOut: string;
}

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const { toast } = useToast();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveTimeEntry = (timeIn: string, timeOut: string) => {
    if (selectedDate) {
      const newEntry = {
        date: format(selectedDate, "yyyy-MM-dd"),
        timeIn,
        timeOut,
      };
      setTimeEntries([...timeEntries, newEntry]);
      setSelectedDate(null);
      toast({
        title: "Time Entry Saved",
        description: `Time entry for ${format(selectedDate, "MMMM d, yyyy")} has been saved.`,
      });
    }
  };

  const hasTimeEntry = (date: Date) =>
    timeEntries.some((entry) => entry.date === format(date, "yyyy-MM-dd"));

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <div className="grid grid-cols-7 gap-px bg-slate-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-slate-100 p-2 text-center text-sm font-medium"
            >
              {day}
            </div>
          ))}
          {daysInMonth.map((date) => (
            <div key={date.toISOString()} className="bg-white aspect-square">
              <DayCell
                date={date}
                isToday={isSameDay(date, new Date())}
                hasTimeEntry={hasTimeEntry(date)}
                onClick={() => handleDayClick(date)}
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent>
          {selectedDate && (
            <TimeEntryForm
              date={selectedDate}
              onSave={handleSaveTimeEntry}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;