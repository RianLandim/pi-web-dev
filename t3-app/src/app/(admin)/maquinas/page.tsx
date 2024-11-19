"use client";

import {
  TextInput,
  Text,
  Stack,
  Group,
  Card,
  Skeleton,
  Button,
} from "@mantine/core";
import { IconSearch, IconArrowLeft, IconCirclePlus } from "@tabler/icons-react";
import { parseAsString, useQueryState } from "nuqs";
import NavBar from "~/app/_components/navBar";
import { api } from "~/trpc/react";
import { match, P } from "ts-pattern";
import Link from "next/link";
import { MachineCard } from "./_components/MachineCard";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
  const router = useRouter();

  const [searchName, setSearchName] = useQueryState(
    "buscar",
    parseAsString.withOptions({
      clearOnDefault: true,
    }),
  );

  const [customerId] = useQueryState(
    "cliente",
    parseAsString.withOptions({
      clearOnDefault: true,
    }),
  );

  const machinesQuery = api.machine.list.useQuery(
    { customerId: customerId ?? undefined, name: searchName ?? undefined },
    {
      staleTime: Infinity,
    },
  );

  return (
    <main className="relative h-screen w-full bg-main pt-16">
      <article className="flex h-[92%] w-full flex-col space-y-5 px-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-white">Máquinas</h1>
          <Button variant="transparent" onClick={() => router.back()}>
            <IconArrowLeft size={25} color="white" />
          </Button>
        </div>

        <section className="flex h-fit items-center space-x-2">
          <div className="flex w-full rounded-md">
            <TextInput
              leftSection={<IconSearch />}
              className="w-full"
              radius="md"
              onChange={({ target }) => setSearchName(target.value)}
              value={searchName ?? undefined}
            />
          </div>

          <Link href="/maquinas/registro">
            <IconCirclePlus size={32} className="text-white" />
          </Link>
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
                return data.map((item) => (
                  <MachineCard key={item.id} machine={item} />
                ));
              })
              .with({ data: P.nullish }, () => (
                <p>Nenhuma maquina encontrada!</p>
              ))
              .exhaustive()}
          </Stack>
        </section>
      </article>
      <NavBar />
    </main>
  );
}
