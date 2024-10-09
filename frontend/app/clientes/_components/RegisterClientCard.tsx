import { z } from "zod";

import { useForm, zodResolver } from "@mantine/form";

import { Button, TextInput } from "@mantine/core";

const editClientDataFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  phone: z
    .string({ required_error: "Telefone obrigatório" })
    .min(11, "Telefone obrigatório"),
  email: z.string().min(1, "Email obrigatório").email("E-mail inválido"),
  address: z.string().min(1, "Endereço obrigatória"),
});

type EditClientData = z.infer<typeof editClientDataFormSchema>;

export default function RegisterCardClient() {
  const form = useForm<EditClientData>({
    mode: "controlled",
    initialValues: {
      address: "",
      email: "",
      name: "",
      phone: "",
    },
    validate: zodResolver(editClientDataFormSchema),
  });

  const submit = (data: EditClientData) => {
    console.log({ data });
  };

  return (
    <section className="bg-cardClientBG flex flex-col space-y-4 w-full rounded-xl px-4 py-3 h-fit">
      <form
        className="w-full flex flex-col space-y-3 h-fit justify-between"
        onSubmit={form.onSubmit(submit)}
      >
        <h1 className="text-lg font-bold">Registro de Cliente</h1>

        <div className="w-full h-fit flex flex-col space-y-2">
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
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <TextInput
              withAsterisk
              label="Endereço"
              placeholder="Endereço"
              key={form.key("address")}
              {...form.getInputProps("address")}
            />
          </div>
        </div>
        <Button type="submit" className="bg-main">
          Salvar
        </Button>
      </form>
    </section>
  );
}
