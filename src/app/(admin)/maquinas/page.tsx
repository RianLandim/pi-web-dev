"use client";

import { useRef, useState } from "react";

import RegisterCardClient from "./_components/RegisterMachineCard";
import { TextInput, Text, Stack, Group, Card, Skeleton } from "@mantine/core";
import { IconSearch, IconArrowLeft, IconCirclePlus } from "@tabler/icons-react";
import { parseAsString, useQueryState } from "nuqs";
import NavBar from "~/app/_components/navBar";
import { api } from "~/trpc/react";
import { match, P } from "ts-pattern";

export default function PaymentsPage() {
  const [searchName, setSearchName] = useQueryState(
    "",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  );

  const [isRegisterCardOpen, setIsRegisterCardOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const customersQuery = api.customer.list.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <main className="relative h-screen w-full bg-main pt-16">
      {isRegisterCardOpen && (
        <div className="absolute left-0 top-0 z-10 flex h-screen w-[100%] items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] sm:w-[60%] md:w-[40%]" ref={cardRef}>
            <RegisterCardClient setIsRegisterCardOpen={setIsRegisterCardOpen} />
          </div>
        </div>
      )}

      <article className="flex h-[92%] w-full flex-col space-y-5 px-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-white">Máquinas </h1>
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

          <IconCirclePlus
            size={32}
            className="text-white"
            onClick={() => setIsRegisterCardOpen(true)}
          />
        </section>

        <section className="flex h-fit w-full flex-col space-y-3 overflow-scroll rounded-xl pb-6">
          <Stack gap="lg">
            {match(customersQuery)
              .with({ isLoading: true }, () => (
                <Skeleton visible={customersQuery.isLoading}>
                  {new Array(5).fill({}).map((_item, index) => (
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
                          <Text>John Doe</Text>
                        </Group>
                        <Group gap="xs">
                          <Text fw="bold">Email:</Text>
                          <Text>jhondoe@email.com.br</Text>
                        </Group>
                      </Stack>
                    </Card>
                  ))}
                </Skeleton>
              ))
              .with({ isError: true }, () => (
                <p className="font-bold text-red-500">
                  Ocorreu um erro ao listar clientes
                </p>
              ))
              .with({ data: P.nonNullable }, ({ data }) => {
                return data.map((item, index) => (
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
                        <Text>{item.email ?? "Não informado"}</Text>
                      </Group>
                    </Stack>
                  </Card>
                ));
              })
              .with({ data: P.nullish }, () => (
                <p>Nenhum cliente encontrado!</p>
              ))
              .exhaustive()}
          </Stack>
        </section>
      </article>
      <NavBar />
    </main>
  );
}
