import { useMemo } from "react";
import { api } from "~/trpc/react";

export function useScheduleDinamycEntries() {
  const { data: customers, isLoading: isCustomerLoading } =
    api.customer.list.useQuery();

  const customerOptions = useMemo(() => {
    return (
      customers?.map((customer) => ({
        label: customer.name,
        value: customer.id,
      })) ?? []
    );
  }, [customers]);

  const priorityOptions = [
    {
      label: "Baixo",
      value: "LOW",
    },
    {
      label: "Médio",
      value: "MEDIUM",
    },
    {
      label: "Alta",
      value: "HIGH",
    },
  ];

  return {
    customerOptions,
    isCustomerLoading,
    priorityOptions,
  };
}
