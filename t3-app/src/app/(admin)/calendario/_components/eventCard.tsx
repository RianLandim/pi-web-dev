import { Trash } from "@phosphor-icons/react";

interface EventCardProps {
  name: string;
  time: string;
  serviceName: string;
}

export default function EventCard(props: EventCardProps) {
  return (
    <div className="flex h-fit w-full rounded-xl bg-cardClientBG px-4 py-3">
      <div className="h-full w-full">
        <h2>{props.name}</h2>
        <h3 className="text-sm">
          Hora: {props.time} | {props.serviceName}
        </h3>
      </div>
      <Trash width={30} />
    </div>
  );
}
