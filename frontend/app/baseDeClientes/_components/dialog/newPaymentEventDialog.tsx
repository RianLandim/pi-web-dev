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
}

export function NewPaymentEventDialog({
  isOpen,
  onClose,
}: NewPaymentEventDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-cardClientBG text-white w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Nova ordem de pagamento</DialogTitle>
        </DialogHeader>
        <NewPaymentCard />
      </DialogContent>
    </Dialog>
  );
}
