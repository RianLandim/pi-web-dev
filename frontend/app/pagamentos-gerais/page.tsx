"use client";

import Image from "next/image";
import { useState } from "react";
import arrowBack from "@/public/arrowBack.svg";
import NavBar from "../components/navBar";
import GeneralPaymentCard from "./components/GeneralPaymentCard";

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
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
    // { data: "12/12/1221", name: "Wesley", isPayed: false },
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col ">
        <div className="flex justify-between w-full items-center">
          {/*  I want to write the name of the cliente below */}
          <h1 className="text-xl">Pagamento(s) do !client name! </h1>
          <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" />
        </div>

        {/* Lista de clientes filtrados */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-y-auto flex flex-col pb-6">
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
