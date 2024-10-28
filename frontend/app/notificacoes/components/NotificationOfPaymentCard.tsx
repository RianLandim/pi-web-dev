import { CurrencyCircleDollar } from "@phosphor-icons/react";

interface cardClientProps {
  name: string;
  data: string;
  isPayed?: boolean;
}

export default function NotificationOfPaymentCard(props: cardClientProps) {
  return (
    <div className="bg-cardClientBG border border-orangeApp flex w-full rounded-xl px-4 py-3 h-fit items-center space-x-4">
      <div className="w-full h-full flex flex-col space-y-3">
        <h2>
          Pagamento{" "}
          <p className="inline-block text-orange-500 font-semibold">prestes</p>{" "}
          a vencer para o cliente{" "}
          <p className="underline inline-block">{props.name}</p>
        </h2>
        <h3>Vencimento: {props.data}</h3>
      </div>
      <CurrencyCircleDollar size={50} />
    </div>
  );
}
