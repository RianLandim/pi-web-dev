"use client";
import Image from "next/image";
import magnifier from "../../public/magnifier.svg";
import { useState } from "react";
import NavBar from "../components/navBar";
import MachineCard from "./components/MachineCard";
import { PlusCircle } from "@phosphor-icons/react";
import arrowBack from "../../public/arrowBack.svg";
import { CalendarEventCard } from "./components/dialog/machineEventDialog";

export default function MachinesPage() {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const machines = [
    {
      machineType: "Geladeira Samsung",
      TypeOfPiece: "Cilindro de gás",
      clientName: "Wesley",
      problemDescription:
        "Loavravwbtwb twbwbwneyne eenenenwny enwnenewnwene enenenenetnetn enenenenten et net net ne nen e e.",
      quantity: 2,
      otherInformations:
        "Loavravwbtwb twbwbwneyne eenenenwny enwnenewnwene enenenenetnetn enenenenten et net net ne nen e e.",
    },
    {
      machineType: "Máquina de lavar Brastemp",
      TypeOfPiece: "Cilindro de gás",
      clientName: "Wesley",
      problemDescription:
        "Loavravwbtwb twbwbwneyne eenenenwny enwnenewnwene enenenenetnetn enenenenten et net net ne nen e e.",
      quantity: 2,
      otherInformations:
        "Loavravwbtwb twbwbwneyne eenenenwny enwnenewnwene enenenenetnetn enenenenten et net net ne nen e e.",
    },
    {
      machineType: "Frigobar Eco",
      TypeOfPiece: "Cilindro de gás",
      clientName: "Wesley",
      problemDescription:
        "Loavravwbtwb twbwbwneyne eenenenwny enwnenewnwene enenenenetnetn enenenenten et net net ne nen e e.",
      quantity: 2,
      otherInformations:
        "Loavravwbtwb twbwbwneyne eenenenwny enwnenewnwene enenenenetnetn enenenenten et net net ne nen e e.",
    },
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredMachines = machines.filter((machine) =>
    machine.machineType.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <CalendarEventCard
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col ">
        <div className="flex justify-between w-full items-center ">
          {/* Título da Página */}
          <h1 className="text-xl">Máquinas</h1>
          <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" />
        </div>

        <section className="flex space-x-2 items-center h-fit">
          <div className="flex w-[85%] rounded-md bg-whiteApp">
            <Image
              className="bg-grayApp w-[15%] p-2 rounded-md"
              src={magnifier}
              width={25}
              height={25}
              alt="maginifierIcon"
            />
            <input
              className="placeholder:pl-2 w-full text-black p-2 rounded-xl"
              placeholder="Pesquise pelo nome..."
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Botão que abre o card */}
          <PlusCircle
            size={32}
            className="fill-whiteApp"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          />
        </section>

        {/* Lista de clientes filtrados */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-y-auto flex flex-col pb-6">
          {filteredMachines.length > 0 ? (
            filteredMachines.map((machine, index) => (
              <MachineCard
                TypeOfPiece={machine.TypeOfPiece}
                quantity={machine.quantity}
                key={index}
                machineType={machine.machineType}
                clientName={machine.clientName}
                problemDescription={machine.problemDescription}
                otherInformations={machine.otherInformations}
              />
            ))
          ) : (
            <p>Nenhum máquina encontrado.</p>
          )}
        </section>
        <NavBar />
      </article>
    </main>
  );
}
