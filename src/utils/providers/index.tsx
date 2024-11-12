"use client";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import SessionProvider from "./SessionProvider";
import { MantineProvider } from "@mantine/core";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary>{children}</HydrationBoundary>
        </QueryClientProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
