interface cardClientProps {
  machineType: string;
  TypeOfPiece: string; //ok
  problemDescription: string; //ok
  clientName: string; //ok
  otherInformations?: string; //ok
  quantity: number; // ok
}

// machineType: z.string().min(1, "Nome obrigatório"),
// problemDescription: z.string().min(1, "Campo Obrigatório"),
// TypeOfPiece: z.string().min(1, "Campo Obrigatório"),
// clientName: z.string().min(1, "Nome obrigatório"),
// otherInformations: z.string(),
// quantity: z
//   .string()
//   .transform((value) => Number(value)) // Convert the string to a number
//   .refine((value) => !isNaN(value) && value > 0, {
//     message: "Requer um número",
//   }),

export default function MachineCard(props: cardClientProps) {
  return (
    <section className="bg-cardClientBG w-full rounded-xl px-4 py-3 h-fit">
      <h2 className="font-bold"> {props.machineType}</h2>
      <div className="text-sm flex flex-col space-y-3">
        <div className="flex space-x-1">
          <p className="font-semibold ">Cliente: </p>
          <p>{props.clientName}</p>
        </div>

        <div className="flex space-x-1">
          <p className="font-semibold">Tipo de peça:</p>
          <p> {props.TypeOfPiece}</p>
        </div>

        <div>
          <p className="font-semibold">Quantidade:</p>
          <p> {props.quantity}</p>
        </div>

        <div>
          <p className="font-semibold">Problema identificado:</p>
          <p> {props.problemDescription}</p>
        </div>

        {props.otherInformations && (
          <div>
            <p className="font-semibold">Outras Informaçoes:</p>
            <p>{props.otherInformations}</p>
          </div>
        )}
      </div>
    </section>
  );
}
