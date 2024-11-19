import { Button, Card, Collapse, Group, Stack, Text } from "@mantine/core";
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
      <Stack gap="xs">
        <Group gap="xs">
          <Text fw="bold">Nome:</Text>
          <Text>{customer.name}</Text>
        </Group>
        <Group gap="xs">
          <Text fw="bold">Email:</Text>
          <Text>{customer.email ?? "Não informado"}</Text>
        </Group>

        <Collapse in={opened}>
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

          <Group grow>
            <Link href={`/clientes/${customer.id}/servicos`}>
              <Button fullWidth>
                <Text fw={700}>Ver Serviços</Text>
              </Button>
            </Link>
            <Link href={`/clients/${customer.id}/maquinas`}>
              <Button fullWidth>
                <Text fw={700}>Ver maquinas</Text>
              </Button>
            </Link>
          </Group>
        </Collapse>

        <Button variant="transparent" onClick={toggle}>
          <Text td="underline">{opened ? "Ver menos" : "Ver mais"}</Text>
        </Button>
      </Stack>
    </Card>
  );
}
