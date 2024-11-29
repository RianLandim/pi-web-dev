import {
  Button,
  Card,
  Collapse,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";

interface cardClientProps {
  customer: RouterOutputs["customer"]["list"][number];
}

export default function CardClient({ customer }: cardClientProps) {
  const [opened, { toggle }] = useDisclosure();

  const formatAddress = (address: typeof customer.address) =>
    `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city}-${address.state}`;

  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Stack gap="md">
        <Group gap="xs">
          <Text fw="bold">Nome:</Text>
          <Text>{customer.name}</Text>
        </Group>

        <Group gap="xs">
          <Text fw="bold">Email:</Text>
          <Text>{customer.email ?? "Não informado"}</Text>
        </Group>

        <Collapse in={opened}>
          <Flex direction="column" gap="md">
            <Stack gap="xs">
              <Group gap="xs">
                <Text fw="bold">Endeço:</Text>
                <Text>{formatAddress(customer.address)}</Text>
              </Group>

              <Group gap="xs">
                <Text fw="bold">Máquinas:</Text>
                <Text>{customer._count.Machine}</Text>
              </Group>
              <Group gap="xs">
                <Text fw="bold">Serviços:</Text>
                <Text>{customer._count.services}</Text>
              </Group>
            </Stack>

            <Group style={{ alignSelf: "center" }}>
              <Flex direction="row" gap="md">
                <Link href={`/clientes/${customer.id}/servicos`}>
                  <Button>
                    <Text fw={500}>Ver Serviços</Text>
                  </Button>
                </Link>
                <Link
                  href={{
                    pathname: `/maquinas`,
                    query: { cliente: customer.id },
                  }}
                >
                  <Button>
                    <Text fw={500}>Ver maquinas</Text>
                  </Button>
                </Link>
              </Flex>
            </Group>
          </Flex>
        </Collapse>

        <Button
          variant="filled"
          onClick={toggle}
          w={120}
          style={{ alignSelf: "center" }}
        >
          <Text td="underline">{opened ? "Ver menos" : "Ver mais"}</Text>
        </Button>
      </Stack>
    </Card>
  );
}
