import { Button } from "../../../package/ui/src/button";
import { Input } from "../../../package/ui/src/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";

const EditClientDataFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  phone: z
    .string({ required_error: "Telefone obrigatório" })
    .min(11, "Telefone obrigatório"),
  email: z.string().min(1, "Email obrigatório").email("E-mail inválido"),
  address: z.string().min(1, "Endereço obrigatória"),
});

type EditClientData = z.infer<typeof EditClientDataFormSchema>;

export default function RegisterCardClient() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditClientData>({
    resolver: zodResolver(EditClientDataFormSchema),
  });
  const registerWithMask = useHookFormMask(register);

  const submit = (data: any) => {
    console.log("data:", data);
  };

  return (
    <section className="bg-cardClientBG flex flex-col space-y-4 w-full rounded-xl px-4 py-3 h-fit">
      <form
        className="w-full flex flex-col space-y-3 h-fit justify-between"
        onSubmit={handleSubmit(submit)}
      >
        <h1>Registro de Cliente</h1>

        <div className="w-full h-fit flex flex-col space-y-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-light">Nome</p>
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
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-light">Email</p>
            <Input
              id="email"
              placeholder={(errors.email && errors.email.message) || "Email"}
              type="email"
              className={`pl-2 ${
                errors.email ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("email")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-light">Telefone</p>
            <Input
              id="phone"
              placeholder={(errors.phone && errors.phone.message) || "Telefone"}
              type="text"
              className={`pl-2 ${
                errors.phone ? "placeholder:text-red-500" : "text-black"
              }`}
              {...registerWithMask("phone", ["(99) 9 9999-9999"])}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-light">Enderenço</h3>
            <Input
              id="address"
              placeholder={
                (errors.address && errors.address.message) || "Endereço"
              }
              type="text"
              className={`pl-2 ${
                errors.address ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("address")}
            />
          </div>
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </section>
  );
}
