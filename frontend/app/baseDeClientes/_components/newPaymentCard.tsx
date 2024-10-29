import { Button } from "../../../package/ui/src/button";
import { Input } from "../../../package/ui/src/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

interface cardProps {
  name: string;
}

const EditClientDataFormSchema = z.object({
  value: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Insira um valor",
    }),
  dueDate: z.string().min(1, "*"),
  name: z.string().min(1, ""),
});

type EditClientData = z.infer<typeof EditClientDataFormSchema>;

export default function NewPaymentCard({ name }: cardProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditClientData>({
    resolver: zodResolver(EditClientDataFormSchema),
  });

  const [clientName, setClientName] = useState<string>(name)

  useEffect(() => {
    reset({
      name: clientName,
    });
  }, [clientName, reset]);

  const submit = (data: any) => {
    console.log("data:", data);
  };

  return (
    <section className="bg-cardClientBG flex flex-col space-y-4 w-full rounded-xl h-fit">
      <form
        className="w-full flex flex-col space-y-5 h-fit justify-between"
        onSubmit={handleSubmit(submit)}
      >
        <div className="w-full h-fit flex flex-col space-y-2">
          <div className="flex w-full flex-col space-y-1">
            <h3 className="text-sm font-light">Nome:</h3>
            <Input
              id="name"
              placeholder={(errors.name && errors.name.message) || "Nome"}
              type="text"
              className={`pl-2 ${
                errors.name ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("name")}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-light">Valor:</p>
            <Input
              id="value"
              placeholder={(errors.value && errors.value.message) || "R$"}
              type="text"
              className={`pl-2 ${
                errors.value ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("value")}
            />
          </div>

          <div className="flex w-full flex-col space-y-1">
            <h3 className="text-sm font-light">Data de vencimento:</h3>
            <Input
              id="dueDate"
              placeholder={
                (errors.dueDate && errors.dueDate.message) || "Endereço"
              }
              type="date"
              className={`pl-2 ${
                errors.dueDate ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("dueDate")}
            />
          </div>
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </section>
  );
}
