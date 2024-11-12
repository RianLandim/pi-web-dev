import { Trash } from "@phosphor-icons/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button, Input } from "@mantine/core";

interface cardClientProps {
  name: string;
  data: string;
  email: string;
  phone: string;
  address: string;
  scheduledVisits: string;
  visitsMade: string;
  isEditing?: boolean;
}

const EditClientDataFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().min(1, "Email obrigatório").email("Email Inválido"),
  phone: z.string().min(1, "Telefone obrigatório"),
  address: z.string().min(1, "Endereço obrigatória"),
});

type EditClientData = z.infer<typeof EditClientDataFormSchema>;

export default function DetailedCardClient(props: cardClientProps) {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<EditClientData>({
    resolver: zodResolver(EditClientDataFormSchema),
  });
  const [isEditing, setIsEditing] = useState<boolean>(props.isEditing ?? false);

  useEffect(() => {
    reset(props);
  }, [props, reset]);

  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    console.log(isEditing);
  };

  return (
    <section className="flex h-fit w-full flex-col space-y-4 rounded-xl bg-cardClientBG px-4 py-3">
      <form className="h-fit w-full justify-between">
        {isEditing ? (
          <div className="flex h-fit w-full flex-col space-y-4">
            <Input
              id="name"
              placeholder={errors.name?.message ?? "Nome"}
              type="text"
              className={`pl-2 ${
                errors.name ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("name")}
            />

            <Input
              id="email"
              placeholder={errors.email?.message ?? "Email"}
              type="email"
              className={`pl-2 ${
                errors.email ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("email")}
            />

            <Input
              id="phone"
              placeholder={errors.phone?.message ?? "Telefone"}
              type="text"
              className={`pl-2 ${
                errors.phone ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("phone")}
            />
            <Input
              id="address"
              placeholder={errors.address?.message ?? "Endereço"}
              type="text"
              className={`pl-2 ${
                errors.address ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("address")}
            />
          </div>
        ) : (
          <div className="flex h-fit w-full flex-col space-y-4">
            <h1 className="text-2xl">Nome: {props.name}</h1>
            <h2>Email: {props.email}</h2>
            <h2>Telefone: {props.phone}</h2>
            <h2>Endereço: {props.address}</h2>
          </div>
        )}
      </form>
      <div className="h-full w-full text-sm">
        <h2>Visitas agendadas: {props.scheduledVisits}</h2>
        <h2>Visitas feitas: {props.visitsMade}</h2>
      </div>

      {isEditing ? (
        <div className="flex items-center justify-center space-x-10">
          <Button>Salvar</Button>
          <Trash weight="fill" size={31} color="#F34213" />
        </div>
      ) : (
        <Button onClick={toggleEditing}>Editar</Button>
      )}
    </section>
  );
}
