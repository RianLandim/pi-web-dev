import Image from "next/image";
import personIcon from "../../../public/personIcon.svg";

interface cardClientProps {
  name: string;
  description: string;
}

export default function CardClient(props: cardClientProps) {
  return (
    <div className="bg-cardClientBG flex w-full rounded-xl px-4 py-3 h-fit">
      <div className="w-full h-full">
        <h2>{props.name}</h2>
        <h3 className="text-sm">Descrição: {props.description}</h3>
      </div>
      <Image src={personIcon} width={30} height={30} alt="" />
    </div>
  );
}
