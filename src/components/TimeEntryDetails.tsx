import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";

interface TimeEntryDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  timeIn?: string;
  timeOut?: string;
}

const TimeEntryDetails = ({
  isOpen,
  onClose,
  date,
  timeIn,
  timeOut,
}: TimeEntryDetailsProps) => {
  const formatTime = (time?: string) => {
    if (!time) return "Not set";
    return format(new Date(`2000-01-01T${time}`), "hh:mm a");
  };

  const calculateDuration = () => {
    if (!timeIn || !timeOut) return "0 hours";
    
    const [inHours, inMinutes] = timeIn.split(":").map(Number);
    const [outHours, outMinutes] = timeOut.split(":").map(Number);
    
    const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {format(date, "MMMM d, yyyy")}
            {timeIn && timeOut && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Time In</span>
            </div>
            <span className="text-sm font-semibold">{formatTime(timeIn)}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Time Out</span>
            </div>
            <span className="text-sm font-semibold">{formatTime(timeOut)}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Total Duration</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">
              {calculateDuration()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryDetails;