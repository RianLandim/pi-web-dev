"use client";

import { TextInput, Text, Stack, Group, Card, Skeleton } from "@mantine/core";
import { IconSearch, IconArrowLeft } from "@tabler/icons-react";
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

  const machinesQuery = api.machine.list.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <main className="relative h-screen w-full bg-main pt-16">
      <article className="flex h-[92%] w-full flex-col space-y-5 px-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-white">Pagamentos</h1>
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
        </section>

        <section className="flex h-fit w-full flex-col space-y-3 overflow-scroll rounded-xl pb-6">
          <Stack gap="lg">
            {match(machinesQuery)
              .with({ isLoading: true }, () => (
                <Skeleton visible={machinesQuery.isLoading}>
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
                  Ocorreu um erro ao listar maquinas
                </p>
              ))
              .with({ data: P.nonNullable }, ({ data }) => {
                return data.map((item, index) => (
                  <Card
                    key={index}
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
                        <Text fw="bold">Problema:</Text>
                        <Text>{item.problem ?? "Não informado"}</Text>
                      </Group>
                    </Stack>
                  </Card>
                ));
              })
              .with({ data: P.nullish }, () => (
                <p>Nenhum pagamento encontrada!</p>
              ))
              .exhaustive()}
          </Stack>
        </section>
      </article>
      <NavBar />
    </main>
  );
}
