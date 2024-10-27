import Image from "next/image";
import checkedIncon from "../../../public/checkedIncon.svg";
import notCheckedIncon from "../../../public/notCheckedIcon.svg";

interface cardClientProps {
  name: string;
  data: string;
  isPayed?: boolean;
  paymentDeadline?: string;
  value: string;
  serviceType: string;
}

export default function EspecificPaymentCard(props: cardClientProps) {
  return (
    <section className="bg-cardClientBG flex w-full rounded-xl px-4 py-3 h-fit">
      <div className="w-full h-full">
        <h2>Serviço: {props.serviceType}</h2>

        <div className="flex space-x-1 text-sm">
          <p>Pagamento: {props.isPayed ? "Pago" : "Pendente"}</p>
        </div>

        {props.isPayed ? (
          <h3 className="text-sm">Data: {props.data}</h3>
        ) : (
          <h3 className="text-sm">Vencimento: {props.paymentDeadline}</h3>
        )}
        
        <h3 className="text-sm">Valor: R$ {props.value}</h3>
      </div>
      <Image
        src={props.isPayed ? checkedIncon : notCheckedIncon}
        width={30}
        height={30}
        alt=""
      />
    </section>
  );
}
