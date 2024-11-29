import { Inter } from "next/font/google";
import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

// import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "~/utils/providers";
import { Suspense } from "react";

import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Refritec",
  description: "Refritec seu sistema de agendamento",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  setDefaultOptions({
    locale: ptBR,
  });

  return (
    <html
      lang="pt-br"
      // className={`${GeistSans.variable}`}
    >
      <body className={inter.className}>
        <TRPCReactProvider>
          <Suspense>
            <Providers>{children}</Providers>
          </Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
