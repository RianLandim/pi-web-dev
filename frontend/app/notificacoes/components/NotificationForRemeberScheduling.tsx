import { CalendarCheck } from "@phosphor-icons/react";

interface cardClientProps {
  name: string;
  data: string;
}

export default function NotificationForRemeberScheduling(
  props: cardClientProps
) {
  return (
    <div className="bg-cardClientBG border border-orangeApp flex w-full rounded-xl px-4 py-3 h-fit items-center space-x-4">
      <div className="w-full h-full flex flex-col space-y-3">
        <h2>
          Agendamento marcado para{" "}
          <p className="font-semibold inline-block text-orangeApp">amanhã</p>{" "}
          para o(a) cliente <p className="underline inline-block">{props.name}</p>
        </h2>
        <h3>Data: {props.data}</h3>
      </div>
      <CalendarCheck size={50} />
    </div>
  );
}
