import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button, Input } from "@mantine/core";
import { useCalendarEventDisclosure } from "./hooks/useCalendarEventDisclosure";

const EditClientDataFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  event: z.string().min(1, "Nome do compromisso"),
  hour: z.string().min(1, "*"),
  date: z.string().min(1, "*"),
  priority: z.string().min(1, "*"),
});

type EditClientData = z.infer<typeof EditClientDataFormSchema>;

export default function SchedulingCard() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<EditClientData>({
    resolver: zodResolver(EditClientDataFormSchema),
  });
  // const registerWithMask = useHookFormMask(register);
  // Simulação de recebimento de uma lista de nomes
  const [names] = useState([
    "Bruno",
    "Maria",
    "Albania",
    "Algeria",
    "Gabriel",
    "Gilberto",
    "Antarctica",
    "Fontes",
    // ... outros nomes
  ]);

  const { selectedDate } = useCalendarEventDisclosure();

  useEffect(() => {
    reset({
      date: selectedDate,
    });
  }, [selectedDate, reset]);

  const submit = (data: unknown) => {
    console.log("data:", data);
  };

  return (
    <section className="flex h-fit w-full flex-col space-y-4 rounded-xl bg-cardClientBG px-4 py-3">
      <form
        className="flex h-fit w-full flex-col justify-between space-y-3"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex h-fit w-full flex-col space-y-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-light">Evento</p>
            <Input
              id="event"
              placeholder={errors.event?.message ?? "Conserto máquina de lavar"}
              type="text"
              className={`pl-2 ${
                errors.event ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("event")}
            />
          </div>
          <div className="flex flex-col space-y-1">
            {/* Datalist com os nomes */}
            <datalist id="nameList">
              {names.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </datalist>

            <p className="text-sm font-light">Nome</p>
            <Input
              id="name"
              placeholder={errors.name?.message ?? "Nome"}
              type="text"
              list="nameList"
              // autocomplete="off"
              className={`pl-2 ${
                errors.name ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("name")}
            />
          </div>

          <div className="flex w-full space-x-2">
            <div className="flex w-[40%] flex-col space-y-1">
              <p className="text-sm font-light">Hora</p>
              <Input
                id="hour"
                placeholder={errors.hour?.message ?? "Telefone"}
                type="time"
                className={`pl-2 ${
                  errors.hour ? "placeholder:text-red-500" : "text-black"
                }`}
                {...register("hour")}
              />
            </div>
            <div className="flex w-[60%] flex-col space-y-1">
              <h3 className="text-sm font-light">Data</h3>
              <Input
                id="date"
                placeholder={errors.date?.message ?? "Endereço"}
                type="date"
                className={`pl-2 ${
                  errors.date ? "placeholder:text-red-500" : "text-black"
                }`}
                {...register("date")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-light">Prioridade</p>
          <select
            id="email"
            className={`h-10 rounded-md pl-2 ${
              errors.event ? "placeholder:text-red-500" : "text-black"
            }`}
            {...register("priority")}
          >
            <option className="bg-red-500 text-whiteApp" value="high">
              Alto
            </option>
            <option className="bg-yellow-400 text-whiteApp" value="medium">
              Médio
            </option>
            <option className="bg-green-400 text-whiteApp" value="low">
              Baixa
            </option>
          </select>
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </section>
  );
}
