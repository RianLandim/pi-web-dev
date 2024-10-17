import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../../../../components/ui/dialog";
import MachineRegisterForm from "../machineRegister";

interface dialog {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

export function CalendarEventCard({ isDialogOpen, setIsDialogOpen }: dialog) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogContent className="bg-cardClientBG text-white w-[90%] rounded-lg">
        <DialogTitle className="text-xl">Registro de Máquinas</DialogTitle>
        <MachineRegisterForm />
      </DialogContent>
    </Dialog>
  );
}
