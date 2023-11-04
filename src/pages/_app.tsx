import "@/styles/index.scss";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { classNames } from "@/utils/classNames";
import React from "react";
import GeneralLayout from "@/layouts/general-layout";
import { NextPage } from "next";

export const googleSans = localFont({
  src: [
    {
      path: "./fonts/GoogleSansDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSansDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSansDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
  disableLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <div className={classNames(googleSans.className, "app-wrapper")}>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='alternate icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      {Component.disableLayout ? (
        <Component {...pageProps} />
      ) : (
        <GeneralLayout>
          <Component {...pageProps} />
        </GeneralLayout>
      )}
    </div>
  );
}
