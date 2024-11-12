import "~/styles/globals.css";
import "@mantine/core/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "~/utils/providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Refritec",
  description: "Refritec seu sistema de agendamento",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Suspense>
            <Providers>{children}</Providers>
          </Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
