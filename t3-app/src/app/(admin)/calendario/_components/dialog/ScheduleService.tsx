import { Button, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { IconCirclePlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  createScheduleValidator,
  type CreateScheduleValidatorProps,
} from "~/utils/validators/create-schedule-validator";
import { useScheduleDinamycEntries } from "../hooks/useScheduleDinamycEntries";

export function ScheduleServiceDialog() {
  const form = useForm<CreateScheduleValidatorProps>({
    validate: zodResolver(createScheduleValidator),
    initialValues: {
      name: "",
      clientId: "",
      scheduleAt: new Date(),
      priority: "MEDIUM",
    },
  });

  const { customerOptions, isCustomerLoading } = useScheduleDinamycEntries();

  const submit = (data: CreateScheduleValidatorProps) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="transparent" title="Criar Agendamento">
          <IconCirclePlus size={32} className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Criar Agendamento</DialogTitle>
          <DialogDescription>
            Adicionar aqui um agendamento a seu cliente
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={form.onSubmit(submit)}>
          <TextInput
            withAsterisk
            label="Nome"
            placeholder="Nome"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Select
            data={customerOptions}
            disabled={isCustomerLoading}
            withAsterisk
            label="Cliente"
            placeholder="Cliente"
            key={form.key("clientId")}
            {...form.getInputProps("clientId")}
          />
          <DateTimePicker
            withAsterisk
            label="Agendar"
            placeholder="Agendar"
            key={form.key("scheduleAt")}
            {...form.getInputProps("scheduleAt")}
          />

          <Button type="submit">Agendar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
