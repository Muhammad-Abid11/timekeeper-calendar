import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface TimeEntryFormProps {
  date: Date;
  onSave: (timeIn: string, timeOut: string) => void;
}

const TimeEntryForm = ({ date, onSave }: TimeEntryFormProps) => {
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(timeIn, timeOut);
    setTimeIn("");
    setTimeOut("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-4">
        Time Entry for {format(date, "MMMM d, yyyy")}
      </h3>
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-slate-500" />
        <Input
          type="time"
          value={timeIn}
          onChange={(e) => setTimeIn(e.target.value)}
          required
          className="w-32"
        />
        <span>to</span>
        <Input
          type="time"
          value={timeOut}
          onChange={(e) => setTimeOut(e.target.value)}
          required
          className="w-32"
        />
      </div>
      <Button type="submit" className="w-full">
        Save Time Entry
      </Button>
    </form>
  );
};

export default TimeEntryForm;