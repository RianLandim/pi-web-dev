"use client";

import Image from "next/image";
import arrowBack from "../../public/arrowBack.svg";
import magnifier from "../../public/magnifier.svg";
import CardClient from "./_components/CardClient";
import { useState } from "react";
import NavBar from "../components/navBar";
import { PlusCircle } from "@phosphor-icons/react";
import DetailedCardClient from "./_components/DetailedCardClient";

export default function PaymentsPage() {
  const [name, setName] = useState("");

  const clients = [
    { description: "Manuteçao de geladeira", name: "Wesley" },
    { description: "Manuteçao de geladeira", name: "Maria" },
    { description: "Manuteçao de geladeira", name: "João" },
    { description: "Manuteçao de geladeira", name: "Carlos" },
    { description: "Manuteçao de geladeira", name: "Ana" },
    { description: "Manuteçao de geladeira", name: "Gomes" },
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16">
      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col ">
        <div className="flex justify-between w-full items-center ">
          <h1 className="text-xl">Base de Clientes</h1>
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
          <PlusCircle size={32} className="fill-whiteApp" />
        </section>

        <DetailedCardClient
          VisitsMade="12"
          address="Rua taltatatllt"
          data="12/12/1915"
          email="test@email.com"
          name="Ricardo"
          phone="(11) 9 91234-1234"
          scheduledVisits="12" isEditing
        />

        {/* Lista de clientes filtrados */}
        <section className="w-full h-fit rounded-xl space-y-3 overflow-scroll flex flex-col pb-6">
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <CardClient
                key={index}
                name={client.name}
                description={client.description}
              />
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </section>
      </article>
      <NavBar />
    </main>
  );
}
