import { useForm, zodResolver } from "@mantine/form";

import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import {
  createCustomerValidator,
  type CreateCustomerValidatorProps,
} from "~/utils/validators/create-customer-validator";
import { api } from "~/trpc/react";
import type { Dispatch, SetStateAction } from "react";

interface RegisterCardProps {
  setIsRegisterCardOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterCardClient({
  setIsRegisterCardOpen,
}: RegisterCardProps) {
  const form = useForm<CreateCustomerValidatorProps>({
    mode: "controlled",
    initialValues: {
      email: "",
      name: "",
      contact: "",
      address: {
        city: "",
        neighborhood: "",
        number: 0,
        state: "",
        street: "",
        zipCode: "",
      },
    },
    validate: zodResolver(createCustomerValidator),
  });

  const createCustomerMutation = api.customer.create.useMutation();
  const fetchCepMutation = api.utils.fetchCep.useMutation();
  const apiUtils = api.useUtils();

  const submit = (data: CreateCustomerValidatorProps) => {
    createCustomerMutation.mutate(data, {
      onSuccess: () => {
        void apiUtils.customer.list.invalidate();
        setIsRegisterCardOpen(false);
      },
    });
  };

  form.watch("address.zipCode", ({ value }) => {
    if (!(value.length === 8)) return;
    fetchCepMutation.mutate(
      {
        cep: value,
      },
      {
        onSuccess: (values) => {
          console.log({ values });
          form.setValues({
            address: {
              city: values.localidade,
              neighborhood: values.bairro,
              state: values.uf,
              street: values.logradouro,
              zipCode: value,
              number: 0,
            },
          });
        },
      },
    );
  });

  return (
    <section className="flex h-fit w-full flex-col space-y-4 rounded-xl bg-cardClientBG px-4 py-3">
      <form
        className="flex h-fit w-full flex-col justify-between space-y-3"
        onSubmit={form.onSubmit(submit)}
      >
        <h1 className="text-lg font-bold text-white">Registro de Cliente</h1>

        <div className="flex h-fit w-full flex-col space-y-2">
          <div className="flex flex-col space-y-1">
            <TextInput
              withAsterisk
              label="Nome"
              placeholder="Nome"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="jhondoe@gmail.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <TextInput
              withAsterisk
              label="Telefone"
              placeholder="(88) 99999-9999"
              key={form.key("contact")}
              {...form.getInputProps("contact")}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <TextInput
              withAsterisk
              label="CEP"
              placeholder="CEP"
              key={form.key("address.zipCode")}
              {...form.getInputProps("address.zipCode")}
            />
          </div>

          <Group justify="space-between" grow>
            <TextInput
              withAsterisk
              label="Cidade"
              placeholder="Cidade"
              disabled={fetchCepMutation.isPending}
              key={form.key("address.city")}
              {...form.getInputProps("address.city")}
            />
            <TextInput
              withAsterisk
              label="UF"
              placeholder="UF"
              disabled={fetchCepMutation.isPending}
              key={form.key("address.state")}
              {...form.getInputProps("address.state")}
            />
          </Group>

          <Group justify="space-between" grow>
            <TextInput
              withAsterisk
              label="Logradouro"
              placeholder="Logradouro"
              disabled={fetchCepMutation.isPending}
              key={form.key("address.street")}
              {...form.getInputProps("address.street")}
            />
            <NumberInput
              withAsterisk
              label="Número"
              placeholder="Número"
              disabled={fetchCepMutation.isPending}
              key={form.key("address.number")}
              {...form.getInputProps("address.number")}
            />
          </Group>
        </div>
        <Group justify="space-between" grow>
          <Button
            onClick={() => setIsRegisterCardOpen(false)}
            type="button"
            variant="outline"
            color="white"
          >
            Voltar
          </Button>
          <Button
            loading={createCustomerMutation.isPending}
            type="submit"
            className="bg-main"
          >
            Salvar
          </Button>
        </Group>
      </form>
    </section>
  );
}
