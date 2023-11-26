"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QCOptions, SEO } from "@/config/_index";
import Head from "next/head";
import { useState } from "react";
import { Provider } from "jotai";
import ResponsiveInit from "../lib/providers/ResponsiveInit";
import UserInit from "@/lib/providers/UserInit";
import ToastProvider from "@/lib/providers/toaster.provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Comfy Villas",
  description: "A Housing Application",
};

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
            <title> Comfy Villas </title>
          </Head>
          <UserInit />

          <html lang="en">
            <Navbar />
            <body className={inter.className}>
              <ToastProvider> {children}</ToastProvider>
            </body>
            <Footer />
          </html>

          {/* <DevTools theme="dark" /> */}
        </QueryClientProvider>
      </Provider>
    </>
  );
}
