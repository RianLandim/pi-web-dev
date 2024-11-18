"use client";

import {
  Button,
  Fieldset,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DateInput, DateTimePicker } from "@mantine/dates";

import {
  createScheduleValidator,
  type CreateScheduleValidatorProps,
} from "~/utils/validators/create-schedule-validator";
import { useScheduleDinamycEntries } from "../_components/hooks/useScheduleDinamycEntries";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function ScheduleServiceDialog() {
  const router = useRouter();

  const form = useForm<CreateScheduleValidatorProps>({
    validate: zodResolver(createScheduleValidator),
    initialValues: {
      name: "",
      customerId: "",
      description: "",
      scheduledAt: new Date(),
      priority: "LOW",
      payment: {
        amount: 0,
        dueAt: new Date(),
      },
    },
  });

  const { customerOptions, isCustomerLoading, priorityOptions } =
    useScheduleDinamycEntries();

  const apiUtils = api.useUtils();
  const createScheduleMutation = api.service.create.useMutation();

  const submit = (data: CreateScheduleValidatorProps) => {
    createScheduleMutation.mutate(data, {
      onSuccess: () => {
        notifications.show({
          title: "Sucesso",
          message: "Agendamento feito com sucesso",
          color: "green",
        });
        void apiUtils.service.list.invalidate();
        router.replace("/calendario");
      },
    });
  };

  return (
    <main className="flex h-screen w-full flex-col gap-4 bg-main p-4">
      <Title className="font-bold text-white">Criar Agendamento</Title>
      <h2 className="text-sm text-white">
        Adicionar aqui um agendamento a seu cliente
      </h2>

      <form
        className="flex flex-col gap-4 text-white"
        onSubmit={form.onSubmit(submit)}
      >
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
          key={form.key("customerId")}
          {...form.getInputProps("customerId")}
        />
        <DateTimePicker
          withAsterisk
          label="Agendar"
          placeholder="Agendar"
          key={form.key("scheduledAt")}
          {...form.getInputProps("scheduledAt")}
        />

        <Select
          data={priorityOptions}
          withAsterisk
          label="Prioridade"
          placeholder="Prioridade"
          key={form.key("priority")}
          {...form.getInputProps("priority")}
        />

        <Textarea
          withAsterisk
          label="Descrição"
          placeholder="Descrição"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />

        <Fieldset legend="Pagamento" bg="blue">
          <Stack>
            <NumberInput
              label="Preço"
              placeholder="Preço"
              prefix="$"
              allowDecimal
              key={form.key("payment.amount")}
              {...form.getInputProps("payment.amount")}
            />

            <DateInput
              placeholder="Data limite"
              label="Data limite"
              key={form.key("payment.dueAt")}
              {...form.getInputProps("payment.dueAt")}
              locale="pt-BR"
            />
          </Stack>
        </Fieldset>

        <Button type="submit" loading={createScheduleMutation.isPending}>
          Agendar
        </Button>
      </form>
    </main>
  );
}
