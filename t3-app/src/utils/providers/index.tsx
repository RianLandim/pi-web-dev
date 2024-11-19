"use client";

import { type ReactNode } from "react";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { HydrationBoundary } from "@tanstack/react-query";
import { DatesProvider } from "@mantine/dates";

import "dayjs/locale/pt-br";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: "pt-br" }}>
        <Notifications />
        <HydrationBoundary>{children}</HydrationBoundary>
      </DatesProvider>
    </MantineProvider>
  );
}
