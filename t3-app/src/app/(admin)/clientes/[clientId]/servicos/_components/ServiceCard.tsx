import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { formatCurrency } from "~/app/utils/format-currency";
import { api, type RouterOutputs } from "~/trpc/react";
import { statusLabel } from "~/utils/validators/create-service-validator";

interface ServiceCardProps {
  service: RouterOutputs["payments"]["list"][number];
}

export function ServiceCard({ service }: ServiceCardProps) {
  const apiUtils = api.useUtils();
  const updateService = api.service.update.useMutation({
    onSuccess: (_data, variables) => {
      notifications.show({
        title: "Sucesso",
        message: `Serviço ${statusLabel[variables.status]} com sucesso`,
      });
      void apiUtils.payments.list.invalidate();
    },
    onError: () => {
      notifications.show({
        title: "Erro",
        message: "Ocorreu um erro ao atualizar o serviço",
      });
    },
  });

  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Stack gap="xs">
        <Group gap="xs">
          <Text fw="bold">Nome:</Text>
          <Text>{service.checkout.Service?.name}</Text>
        </Group>
        <Group gap="xs">
          <Text fw="bold">Valor:</Text>
          <Text>{formatCurrency(service.value)}</Text>
        </Group>
        <Group gap="xs">
          <Text fw="bold">Status:</Text>
          <Text>{statusLabel[service.checkout.status] ?? "Não informado"}</Text>
        </Group>
        {service.checkout.status === "OPEN" && (
          <Group grow>
            <Button
              loading={updateService.isPending}
              onClick={() =>
                updateService.mutate({
                  id: service.checkoutId,
                  status: "PAID",
                })
              }
            >
              Finalizar
            </Button>
            <Button
              loading={updateService.isPending}
              onClick={() =>
                updateService.mutate({
                  id: service.checkoutId,
                  status: "CANCELLED",
                })
              }
              variant="filled"
              color="red"
            >
              Cancelar
            </Button>
          </Group>
        )}
      </Stack>
    </Card>
  );
}
