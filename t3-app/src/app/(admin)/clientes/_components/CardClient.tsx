import { PersonSimple } from "@phosphor-icons/react";

interface cardClientProps {
  name: string;
  description: string;
}

export default function CardClient(props: cardClientProps) {
  return (
    <div className="flex h-fit w-full rounded-xl bg-cardClientBG px-4 py-3">
      <div className="h-full w-full">
        <h2>{props.name}</h2>
        <h3 className="text-sm">Descrição: {props.description}</h3>
      </div>
      <PersonSimple size={32} className="text-main" />
    </div>
  );
}
