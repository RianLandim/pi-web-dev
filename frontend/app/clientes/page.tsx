"use client";

import Image from "next/image";
import arrowBack from "../../public/arrowBack.svg";

import { useEffect, useRef, useState } from "react";
import NavBar from "../components/navBar";
import { PlusCircle } from "@phosphor-icons/react";
import DetailedCardClient from "./_components/DetailedCardClient";
import RegisterCardClient from "./_components/RegisterClientCard";
import { Accordion, TextInput, Text, Stack, Group, Card } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { parseAsString, useQueryState } from "nuqs";

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
  const [searchName, setSearchName] = useQueryState(
    "",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );
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
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <main className="bg-main h-screen w-full pt-16 relative">
      {isRegisterCardOpen && (
        <div className="absolute top-0 left-0 h-screen w-[100%] flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="w-[90%] sm:w-[60%] md:w-[40%]" ref={cardRef}>
            <RegisterCardClient />
          </div>
        </div>
      )}

      <article className="h-[92%] w-full space-y-5 px-6 flex flex-col ">
        <div className="flex justify-between w-full items-center ">
          <h1 className="text-xl font-bold text-white">Base de Clientes</h1>
          <Image src={arrowBack} width={25} height={25} alt="arrowBackIcon" />
        </div>

        <section className="flex space-x-2 items-center h-fit">
          <div className="flex w-full rounded-md">
            <TextInput
              leftSection={<IconSearch />}
              className="w-full"
              radius="md"
              onChange={({ target }) => setSearchName(target.value)}
              value={searchName}
            />
          </div>

          <PlusCircle
            size={32}
            className="fill-whiteApp"
            onClick={() => setIsRegisterCardOpen(true)}
          />
        </section>

        <section className="w-full h-fit rounded-xl space-y-3 overflow-scroll flex flex-col pb-6">
          <Stack gap="md">
            {filteredClients.map((item, index) => (
              <Card
                key={index.toString()}
                shadow="md"
                padding="md"
                radius="md"
                withBorder
              >
                <Stack gap="xs">
                  <Group gap="xs">
                    <Text fw="bold">Nome:</Text>
                    <Text>{item.name}</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw="bold">Email:</Text>
                    <Text>{item.email}</Text>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Stack>
        </section>
      </article>
      <NavBar />
    </main>
  );
}
