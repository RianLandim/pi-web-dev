import { PartType } from "@prisma/client";
import { useMemo } from "react";
import { api } from "~/trpc/react";

export function useMachineDinamycEntries() {
  const { data: customers, isLoading: isCustomersLoading } =
    api.customer.list.useQuery();

  const customersOptions = useMemo(() => {
    return (
      customers?.map((customer) => ({
        value: customer.id,
        label: customer.name,
      })) ?? []
    );
  }, [customers]);

  const typeOptions = useMemo(() => {
    return [
      {
        value: PartType.MAINTENANCE,
        label: "Manuntenção",
      },
      {
        value: PartType.REPLACEMENT,
        label: "Reposição",
      },
    ];
  }, []);

  return {
    customersOptions,
    isCustomersLoading,
    typeOptions,
  };
}
