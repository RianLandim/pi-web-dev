"use client";

import Image from "next/image";
import arrowBack from "../../public/arrowBack.svg";
import magnifier from "../../public/magnifier.svg";
import CardClient from "./_components/CardClient";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/navBar";
import { PlusCircle } from "@phosphor-icons/react";
import DetailedCardClient from "./_components/DetailedCardClient";
import RegisterCardClient from "./_components/RegisterClientCard";

interface Client {
  description: string;
  name: string;
  data: string;
  email: string;
  phone: string;
  address: string;
  scheduledVisits: string;
  visitsMade: string;
}

export default function PaymentsPage() {
  const [name, setName] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isRegisterCardOpen, setIsRegisterCardOpen] = useState(false); // Controle de visibilidade do card
  const cardRef = useRef<HTMLDivElement | null>(null);

  const clients: Client[] = [
    {
      description: "Manutenção de geladeira",
      name: "Wesley",
      data: "12/12/2022",
      email: "wesley@mail.com",
      phone: "123456789",
      address: "Rua A, 123",
      scheduledVisits: "2",
      visitsMade: "1",
    },
    {
      description: "Manutenção de geladeira",
      name: "Maria",
      data: "10/10/2022",
      email: "maria@mail.com",
      phone: "987654321",
      address: "Rua B, 456",
      scheduledVisits: "3",
      visitsMade: "3",
    },
    // more clients...
  ];

  // Fecha o card se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsRegisterCardOpen(false);
      }
    }

    if (isRegisterCardOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRegisterCardOpen]);

  // Filtra a lista de clientes com base no nome digitado
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16 relative">
      {/* RegisterCardClient que aparece ao clicar */}
      {isRegisterCardOpen && (
        <div className="absolute top-0 left-0 h-screen w-[100%] flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="w-[90%] sm:w-[60%] md:w-[40%]" ref={cardRef}>
            <RegisterCardClient />
          </div>
        </div>
      )}

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
          {/* Botão que abre o card */}
          <PlusCircle
            size={32}
            className="fill-whiteApp"
            onClick={() => setIsRegisterCardOpen(true)}
          />
        </section>

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
                    visitsMade={client.visitsMade}
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

{
  /* Lista de clientes filtrados */
  /* <section className="w-full h-fit rounded-xl space-y-3 overflow-scroll flex flex-col pb-6">
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
        </section> */
}
{
  /* Conditionally render the detailed view or the client list */
}
