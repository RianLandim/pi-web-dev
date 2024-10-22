import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { useCalendarEventDisclosure } from "../hooks/useCalendarEventDisclosure";
import SchedulingCard from "../schedulingCard";

export function CalendarEventCard() {
  const { selectedDate, setSelectedDate } = useCalendarEventDisclosure();

  return (
    <Dialog
      open={!!selectedDate}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedDate("");
        }
      }}
    >
      <DialogContent className="bg-cardClientBG text-white w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Agendamento</DialogTitle>
        </DialogHeader>
        <SchedulingCard />
      </DialogContent>
    </Dialog>
  );
}
