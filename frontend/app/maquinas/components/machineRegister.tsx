import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../package/ui/src/button";
import { Input } from "../../../package/ui/src/input";
import { useState } from "react";

const MachineRegistrationFormSchema = z.object({
  machineType: z.string().min(1, "Nome obrigatório"),
  problemDescription: z.string().min(1, "Campo Obrigatório"),
  TypeOfPiece: z.string().min(1, "Campo Obrigatório"),
  clientName: z.string().min(1, "Nome obrigatório"),
  otherInformations: z.string(),
  quantity: z
    .string()
    .transform((value) => Number(value)) // Convert the string to a number
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Requer um número",
    }),
});

type RegisterMachine = z.infer<typeof MachineRegistrationFormSchema>;

export default function MachineRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterMachine>({
    resolver: zodResolver(MachineRegistrationFormSchema),
  });

  const submit = (data: RegisterMachine) => {
    console.log("data:", data);
  };

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

  return (
    <section>
      <main className="w-full relative text-whiteApp">
        <article className="h-[92%] w-full space-y-5 flex flex-col">
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full flex flex-col space-y-3 h-fit justify-between"
          >
            <div className="w-full h-fit flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-light">Tipo de máquina</p>
                <Input
                  id="machineType"
                  placeholder={
                    (errors.machineType && errors.machineType.message) ||
                    "Geladeira"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.machineType
                      ? "placeholder:text-red-500"
                      : "text-black"
                  }`}
                  {...register("machineType")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-light">Problema identificado</p>
                <Input
                  id="problemDescription"
                  placeholder={
                    (errors.problemDescription && errors.problemDescription.message) || "Gás"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.problemDescription ? "placeholder:text-red-500" : "text-black"
                  }`}
                  {...register("problemDescription")}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-sm font-light">Tipo de peça</p>
                <Input
                  id="TypeOfPiece"
                  placeholder={
                    (errors.TypeOfPiece && errors.TypeOfPiece.message) || "Peça"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.TypeOfPiece
                      ? "placeholder:text-red-500"
                      : "text-black"
                  }`}
                  {...register("TypeOfPiece")}
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

                <p className="text-sm font-light">Nome do CLiente</p>
                <Input
                  id="clientName"
                  placeholder={
                    (errors.clientName && errors.clientName.message) || "Nome"
                  }
                  type="text"
                  list="nameList"
                  // autocomplete="off"
                  className={`pl-2 ${
                    errors.clientName
                      ? "placeholder:text-red-500"
                      : "text-black"
                  }`}
                  {...register("clientName")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-light">Descrição</p>
                <Input
                  id="otherInformations"
                  placeholder={
                    (errors.otherInformations && errors.otherInformations.message) ||
                    "Descrição"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.otherInformations
                      ? "placeholder:text-red-500"
                      : "text-black"
                  }`}
                  {...register("otherInformations")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-light">Quantidade</p>
                <Input
                  id="quantity"
                  placeholder={
                    (errors.quantity && errors.quantity.message) || "2"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.quantity ? "placeholder:text-red-500" : "text-black"
                  }`}
                  {...register("quantity")}
                />
              </div>
            </div>
            <Button type="submit">Registrar</Button>
          </form>
        </article>
      </main>
    </section>
  );
}
