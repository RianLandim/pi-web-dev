import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "../../../../components/ui/dialog";
import NewPaymentCard from "../newPaymentCard";

interface NewPaymentEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  name: string; // Recebe o nome do cliente
}

export function NewPaymentEventDialog({
  isOpen,
  onClose,
  name,
}: NewPaymentEventDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="bg-cardClientBG text-white w-[90%] rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>Nova ordem de pagamento</DialogTitle>
        </DialogHeader>
        <NewPaymentCard name={name} />
      </DialogContent>
    </Dialog>
  );
}
