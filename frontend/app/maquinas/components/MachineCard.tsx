interface cardClientProps {
  clientName: string;
  machineName: string;
  problem: string;
}

export default function MachineCard(props: cardClientProps) {
  return (
    <div className="bg-cardClientBG w-full rounded-xl px-4 py-3 h-fit">
      <h2 className="font-bold"> {props.machineName}</h2>
      <div className="text-sm flex flex-col space-y-3">
        <div className="flex space-x-1">
          <h3 className="font-semibold ">Cliente: </h3>
          <p>{props.clientName}</p>
        </div>
        <div>
          <p className="font-semibold">Problema identificado:</p>
          <p> {props.problem}</p>
        </div>
      </div>
    </div>
  );
}
