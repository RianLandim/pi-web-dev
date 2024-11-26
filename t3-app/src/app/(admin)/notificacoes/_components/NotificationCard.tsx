import { Card, Group, Stack, Text } from "@mantine/core";

import { Bell } from "@phosphor-icons/react";
import { formatDate, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { type RouterOutputs } from "~/trpc/react";

interface ServiceCardProps {
  service: RouterOutputs["payments"]["list"][number];
}

export function NotificationCard({ service }: ServiceCardProps) {
  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Group justify="space-around">
        <Bell size={32} className="text-main" />

        <Stack>
          <Text>
            Voce tem um serviço com{" "}
            {service.checkout.Service?.customer.name ?? "John Doe"} previsto
            para{" "}
            {formatDate(
              service.checkout.Service?.scheduledAt ?? new Date(),
              "dd/MM/yyyy 'as' HH:mm ",
            )}
          </Text>
          <Text c={"gray"} className="text-slate-400">
            {formatDistanceToNow(service.checkout.createdAt, {
              locale: ptBR,
            })}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}
