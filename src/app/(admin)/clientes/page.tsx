"use client";

import { useRef, useState } from "react";

import RegisterCardClient from "./_components/RegisterClientCard";
import { TextInput, Text, Stack, Group, Card } from "@mantine/core";
import { IconSearch, IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { parseAsString, useQueryState } from "nuqs";
import NavBar from "~/app/_components/navBar";

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
    }),
  );

  const [isRegisterCardOpen, setIsRegisterCardOpen] = useState(false);
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
    client.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  return (
    <main className="relative h-screen w-full bg-main pt-16">
      {isRegisterCardOpen && (
        <div className="absolute left-0 top-0 z-10 flex h-screen w-[100%] items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] sm:w-[60%] md:w-[40%]" ref={cardRef}>
            <RegisterCardClient />
          </div>
        </div>
      )}

      <article className="flex h-[92%] w-full flex-col space-y-5 px-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-white">Base de Clientes</h1>
          <IconArrowLeft size={25} color="white" />
        </div>

        <section className="flex h-fit items-center space-x-2">
          <div className="flex w-full rounded-md">
            <TextInput
              leftSection={<IconSearch />}
              className="w-full"
              radius="md"
              onChange={({ target }) => setSearchName(target.value)}
              value={searchName}
            />
          </div>

          <IconPlus
            size={32}
            className="text-white"
            onClick={() => setIsRegisterCardOpen(true)}
          />
        </section>

        <section className="flex h-fit w-full flex-col space-y-3 overflow-scroll rounded-xl pb-6">
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
