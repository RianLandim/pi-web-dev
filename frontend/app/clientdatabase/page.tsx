"use client";

import Image from "next/image";
import arrowBack from "../../public/arrowBack.svg";
import magnifier from "../../public/magnifier.svg";
import CardClient from "./_components/CardClient";
import { useState } from "react";
import NavBar from "../components/navBar";
import { PlusCircle } from "@phosphor-icons/react";
import DetailedCardClient from "./_components/DetailedCardClient";

interface client {
  description: string;
  name: string;
  data: string;
  email: string;
  phone: string;
  address: string;
  scheduledVisits: string;
  VisitsMade: string;
}

export default function PaymentsPage() {
  const [name, setName] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const clients = [
    {
      description: "Manutenção de geladeira",
      name: "Wesley",
      data: "12/12/2022",
      email: "wesley@mail.com",
      phone: "123456789",
      address: "Rua A, 123",
      scheduledVisits: "2",
      VisitsMade: "1",
    },
    {
      description: "Manutenção de geladeira",
      name: "Maria",
      data: "10/10/2022",
      email: "maria@mail.com",
      phone: "987654321",
      address: "Rua B, 456",
      scheduledVisits: "3",
      VisitsMade: "3",
    },
    // more clients...
  ];

  // Filtra a lista de clientes com base no nome digitado
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main  h-screen w-full pt-16">
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

        {/* Lista de clientes filtrados */}
        {/* <section className="w-full h-fit rounded-xl space-y-3 overflow-scroll flex flex-col pb-6">
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
        </section> */}
        {/* Conditionally render the detailed view or the client list */}

        <section className="w-full h-fit rounded-xl space-y-3 overflow-scroll flex flex-col pb-6">
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <div key={index} onClick={() => setSelectedClient(client.name)}>
                {selectedClient === client.name ? (
                  <DetailedCardClient
                    name={client.name}
                    data={client.data}
                    email={client.email}
                    phone={client.phone}
                    address={client.address}
                    scheduledVisits={client.scheduledVisits}
                    VisitsMade={client.VisitsMade}
                    isEditing={false}
                  />
                ) : (
                  <CardClient
                    name={client.name}
                    description={client.description}
                  />
                )}
              </div>
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
