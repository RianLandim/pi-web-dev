import { Input } from "../../../package/ui/src/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../package/ui/src/button";

const MachineRegistrationFormSchema = z.object({
  machineType: z.string().min(1, "Nome obrigatório"),
  problem: z.string().min(1, "Campo Obrigatório"),
  TypeOfPiece: z.string().min(1, "Campo Obrigatório"),
  description: z.string().min(1, "Campo Obrigatório"),
  quantity: z
    .string() // Accept it as a string first
    .min(1, "Digite um número")
    .transform((val) => parseInt(val, 10)) // Then transform it to a number
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Quantidade inválida",
    }),
});

type RegisterMachine = z.infer<typeof MachineRegistrationFormSchema>;

export default function MachineRegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterMachine>({
    resolver: zodResolver(MachineRegistrationFormSchema),
  });

  const submit = (data: any) => {
    console.log("data:", data);
  };

  return (
    <section>
      <main className=" w-full relative text-whiteApp">
        <article className="h-[92%] w-full space-y-5 flex flex-col ">
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
                  id="problem"
                  placeholder={
                    (errors.problem && errors.problem.message) || "Gás"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.problem ? "placeholder:text-red-500" : "text-black"
                  }`}
                  {...register("problem")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-light">Tipo de peça</p>
                <Input
                  id="description"
                  placeholder={
                    (errors.description && errors.description.message) || "Peça"
                  }
                  type="text"
                  className={`pl-2 ${
                    errors.description
                      ? "placeholder:text-red-500"
                      : "text-black"
                  }`}
                  {...register("description")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-light">Quantidade</p>
                <Input
                  id="quantity"
                  placeholder={
                    (errors.quantity && errors.quantity.message) || "2"
                  }
                  type="number"
                  className={`pl-2 ${
                    errors.description
                      ? "placeholder:text-red-500"
                      : "text-black"
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
