import { Button, Card, Collapse, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type PartType } from "@prisma/client";
import type { RouterOutputs } from "~/trpc/react";

interface MachineCardProps {
  machine: RouterOutputs["machine"]["list"][number];
}

export function MachineCard({ machine }: MachineCardProps) {
  const [opened, { toggle }] = useDisclosure();

  const partTypeLabel: Record<PartType, string> = {
    MAINTENANCE: "Manuntenção",
    REPLACEMENT: "Reposição",
  } as const;

  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Stack gap="xs">
        <Group gap="xs">
          <Text fw="bold">Nome:</Text>
          <Text>{machine.name}</Text>
        </Group>
        <Group gap="xs">
          <Text fw="bold">Problema:</Text>
          <Text>{machine.problem ?? "Não informado"}</Text>
        </Group>

        <Group gap="xs">
          <Text fw="bold">Cliente:</Text>
          <Text>{machine.Customer.name}</Text>
        </Group>

        <Collapse in={opened}>
          <Stack gap="xs">
            <Group gap="xs">
              <Text fw="bold">Descrição:</Text>
              <Text>{machine.description}</Text>
            </Group>
            <Group gap="xs">
              <Text fw="bold">Tipo de Problema:</Text>
              <Text>{partTypeLabel[machine.partType]}</Text>
            </Group>
          </Stack>
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
