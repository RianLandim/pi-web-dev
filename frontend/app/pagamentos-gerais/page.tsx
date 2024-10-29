"use client";

import Image from "next/image";
import { useState } from "react";
import arrowBack from "@/public/arrowBack.svg";
import NavBar from "../components/navBar";
import GeneralPaymentCard from "./components/GeneralPaymentCard";
import { PlusCircle } from "@phosphor-icons/react";
import magnifier from "../../public/magnifier.svg";

export default function ClientPaymentsPage({
  params,
}: {
  params: { clientId: string };
}) {
  const [name, setName] = useState("");

  // if (!clientId) return <div>Loading...</div>; // Loading state

  const clients = [
    {
      data: "12/12/1221",
      name: "Wesley",
      isPayed: true,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
    {
      data: "12/12/1221",
      name: "Maria",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
    {
      data: "12/12/1221",
      name: "João",
      isPayed: true,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
    {
      data: "12/12/1221",
      name: "Carlos",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
    {
      data: "12/12/1221",
      name: "Ana",
      isPayed: true,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
    {
      data: "12/12/1221",
      name: "Wesley",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
    {
      data: "12/12/1221",
      name: "Wesley",
      isPayed: false,
      value: "1000",
      paymentDeadline: "12/12/2024",
    },
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col pb-6">
        <div className="flex justify-between w-full items-center">
          {/*  I want to write the name of the cliente below */}
          <h1 className="text-xl">Pagamentos Gerais</h1>
          <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" />
        </div>
        <section className="flex space-x-2 items-center h-fit">
          <div className="flex w-full rounded-md bg-whiteApp">
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
          {/* Botão que abre o card de adicionar pagamento */}
          {/* <PlusCircle
            size={32}
            className="fill-whiteApp"
            onClick={() => setIsRegisterCardOpen(true)}
          /> */}
        </section>

        {/* Lista de clientes filtrados */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-y-auto flex flex-col">
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <GeneralPaymentCard
                paymentDeadline={client.paymentDeadline}
                value={client.value}
                key={index}
                data={client.data}
                name={client.name}
                isPayed={client.isPayed}
              />
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </section>
        <NavBar />
      </article>
    </main>
  );
}
