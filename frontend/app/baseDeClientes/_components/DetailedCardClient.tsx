import { Trash } from "@phosphor-icons/react";
import { Button } from "../../../package/ui/src/button";
import { Input } from "../../../package/ui/src/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewPaymentEventDialog } from "./dialog/newPaymentEventDialog";

interface cardClientProps {
  clientId: string; // Add this line for unique client identification
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
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<EditClientData>({
    resolver: zodResolver(EditClientDataFormSchema),
  });

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(props.isEditing || false);

  const router = useRouter();
  const openCreatePaymentDialog = () => setIsPaymentDialogOpen(true);

  useEffect(() => {
    reset(props);
  }, [props, reset]);

  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const toggleSeePayments = () => {
    router.push(`/pagamentos-por-cliente/${props.clientId}`);
  };

  const submit = (data: any) => {
    console.log("data:", data);
  };

  return (
    <section className="bg-cardClientBG shadow-md flex flex-col space-y-4 w-full rounded-xl px-4 py-3 h-fit">
      <form
        className="w-full h-fit justify-between"
        onSubmit={handleSubmit(submit)}
      >
        {isEditing ? (
          <div className="w-full h-fit flex flex-col space-y-4">
            <Input
              id="name"
              placeholder={(errors.name && errors.name.message) || "Nome"}
              type="text"
              className={`pl-2 ${
                errors.name ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("name")}
            />

            <Input
              id="email"
              placeholder={(errors.email && errors.email.message) || "Email"}
              type="email"
              className={`pl-2 ${
                errors.email ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("email")}
            />

            <Input
              id="phone"
              placeholder={(errors.phone && errors.phone.message) || "Telefone"}
              type="text"
              className={`pl-2 ${
                errors.phone ? "placeholder:text-red-500" : "text-black"
              }`}
              {...register("phone")}
            />
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
            <div className="w-full h-full text-sm">
              <h2>Visitas agendadas: {props.scheduledVisits}</h2>
              <h2>Visitas feitas: {props.visitsMade}</h2>
            </div>
            <div className="flex justify-center space-x-10 items-center">
              <Button>Salvar</Button>
              <Trash weight="fill" size={31} color="#F34213" />
            </div>
          </div>
        ) : (
          <div className="w-full h-fit flex flex-col space-y-4">
            <h1 className="text-xl">
              <b>Nome:</b> {props.name}
            </h1>
            <h2>
              <b>Email:</b> {props.email}
            </h2>
            <h2>
              <b>Telefone:</b> {props.phone}
            </h2>
            <h2>
              <b>Endereço:</b> {props.address}
            </h2>
            <div className="w-full h-full text-sm">
              <h2>Visitas agendadas: {props.scheduledVisits}</h2>
              <h2>Visitas feitas: {props.visitsMade}</h2>
            </div>
          </div>
        )}
      </form>

      {!isEditing && (
        <div className="flex w-full space-y-3 flex-col items-center">
          <Button className="w-3/4" onClick={toggleEditing}>
            Editar
          </Button>
          <Button className="w-3/4" onClick={toggleSeePayments}>
            Pagamentos
          </Button>
          <Button className="w-3/4" onClick={openCreatePaymentDialog}>
            Criar pagamento
          </Button>
        </div>
      )}
      <NewPaymentEventDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        name={props.name}
      />
    </section>
  );
}
