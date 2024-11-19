"use client";

import {
  Button,
  Fieldset,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCircleArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
  type CreateMachineValidatorProps,
  createMachineValidator,
} from "~/utils/validators/create-machine-validator";
import { useMachineDinamycEntries } from "../_components/hooks/useMachineDinamycEntries";
import { api } from "~/trpc/react";

export default function RegisterMachine() {
  const router = useRouter();

  const { customersOptions, isCustomersLoading, typeOptions } =
    useMachineDinamycEntries();

  const form = useForm<CreateMachineValidatorProps>({
    mode: "controlled",
    initialValues: {
      customerId: "",
      name: "",
      partType: "MAINTENANCE",
      problem: "",
      type: "",
      description: "",
    },
    validate: zodResolver(createMachineValidator),
  });

  const createMachineMutation = api.machine.create.useMutation();

  const submit = (data: CreateMachineValidatorProps) => {
    createMachineMutation.mutate(data);
  };

  return (
    <main className="relative h-screen w-full bg-main px-6 py-16">
      <Group justify="space-between">
        <h2 className="text-2xl font-bold text-white">Registro de Máquinas</h2>

        <Button variant="transparent" onClick={() => router.back()}>
          <IconCircleArrowLeft size={32} color="white" />
        </Button>
      </Group>

      <Fieldset
        variant="unstyled"
        className="border border-white p-2 text-white"
      >
        <form onSubmit={form.onSubmit(submit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Nome"
              placeholder="Nome"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Tipo de problema"
              placeholder="Tipo de problema"
              key={form.key("type")}
              {...form.getInputProps("type")}
            />
            <TextInput
              withAsterisk
              label="Problema"
              placeholder="Problema"
              key={form.key("problem")}
              {...form.getInputProps("problem")}
            />
            <Select
              withAsterisk
              label="Tipo de parte"
              placeholder="Selecione..."
              key={form.key("partType")}
              {...form.getInputProps("partType")}
              data={typeOptions}
            />
            <TextInput
              withAsterisk
              label="Descrição"
              placeholder="Descrição"
              key={form.key("description")}
              {...form.getInputProps("description")}
            />
            <Select
              withAsterisk
              label="Cliente"
              placeholder="Selecione..."
              disabled={isCustomersLoading}
              data={customersOptions}
              key={form.key("customerId")}
              {...form.getInputProps("customerId")}
            />

            <Button type="submit" loading={createMachineMutation.isPending}>
              Registrar
            </Button>
          </Stack>
        </form>
      </Fieldset>
    </main>
  );
}
