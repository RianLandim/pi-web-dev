"use client";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import SessionProvider from "./SessionProvider";
import Next13ProgressBar from "next13-progressbar";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary>{children}</HydrationBoundary>
      </QueryClientProvider>
      <Next13ProgressBar height="4px" color="white" />
    </SessionProvider>
  );
}
