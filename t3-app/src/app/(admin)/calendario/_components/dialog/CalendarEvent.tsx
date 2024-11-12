import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useCalendarEventDisclosure } from "../hooks/useCalendarEventDisclosure";
import SchedulingCard from "../SchedulingCard";

export function CalendarEventCard() {
  const { selectedDate, setSelectedDate } = useCalendarEventDisclosure();

  return (
    <Dialog
      open={!!selectedDate}
      onOpenChange={(open) => {
        if (!open) {
          void setSelectedDate("");
        }
      }}
    >
      <DialogContent className="w-[90%] rounded-lg bg-cardClientBG text-white">
        <DialogHeader>
          <DialogTitle>Agendamento</DialogTitle>
        </DialogHeader>
        <SchedulingCard />
      </DialogContent>
    </Dialog>
  );
}
