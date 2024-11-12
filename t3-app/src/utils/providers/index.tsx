"use client";

import { type ReactNode } from "react";

import { MantineProvider } from "@mantine/core";
import { HydrationBoundary } from "@tanstack/react-query";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider>
      <HydrationBoundary>{children}</HydrationBoundary>
    </MantineProvider>
  );
}
