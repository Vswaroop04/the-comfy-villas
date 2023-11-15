"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QCOptions, SEO } from "@/config/_index";
import Head from "next/head";
import { useState } from "react";
import { Provider } from "jotai";
import ResponsiveInit from "@/lib/providers/ResponsiveInit";
import {
  DehydratedState,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Comfy Villas",
  description: "A Housing Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient(QCOptions));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <ResponsiveInit />
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>

          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
          {/* <DevTools theme="dark" /> */}
        </Provider>
      </QueryClientProvider>
    </>
  );
}


