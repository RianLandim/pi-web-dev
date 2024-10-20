import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../../../../components/ui/dialog";
import MachineRegisterForm from "../machineRegister";

interface DialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

export function CalendarEventCard({
  isDialogOpen,
  setIsDialogOpen,
}: DialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogContent
        aria-describedby={undefined}
        className="bg-cardClientBG text-white w-[90%] rounded-lg"
      >
        <DialogTitle className="text-xl">Registro de Máquinas</DialogTitle>

        <MachineRegisterForm />
      </DialogContent>
    </Dialog>
  );
}
