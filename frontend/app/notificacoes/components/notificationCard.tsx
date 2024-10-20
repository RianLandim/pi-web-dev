import Image from "next/image";
import checkedIncon from "../../../public/checkedIncon.svg";
import notCheckedIncon from "../../../public/notCheckedIcon.svg";

interface cardClientProps {
  name: string;
  data: string;
  isPayed?: boolean;
}

export default function NotificationCard(props: cardClientProps) {
  return (
    <div className="bg-cardClientBG flex w-full rounded-xl px-4 py-3 h-fit">
      <div className="w-full h-full">
        <h2>{props.name}</h2>
        <h3>Pago no dia: {props.data}</h3>
      </div>
      <Image
        src={props.isPayed ? checkedIncon : notCheckedIncon}
        width={30}
        height={30}
        alt=""
      />
    </div>
  );
}
