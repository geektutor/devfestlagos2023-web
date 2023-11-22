import "react-toastify/dist/ReactToastify.css";
import "@/styles/index.scss";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { classNames } from "@/utils/classNames";
import React from "react";
import GeneralLayout from "@/layouts/general-layout";
import { NextPage } from "next";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

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
  const router = useRouter();

  // Google analytics to track page change
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    // clean up
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className={classNames(googleSans.className, "app-wrapper")}>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='alternate icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {Component.disableLayout ? (
        <Component {...pageProps} />
      ) : (
        <GeneralLayout>
          <Component {...pageProps} />
        </GeneralLayout>
      )}
      <QueryClientProvider client={queryClient}>
        <Head>
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
          <link rel='alternate icon' href='/favicon.ico' type='image/x-icon' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Head>
        <ToastContainer autoClose={3000} hideProgressBar />
        {Component.disableLayout ? (
          <Component {...pageProps} />
        ) : (
          <GeneralLayout>
            <Component {...pageProps} />
          </GeneralLayout>
        )}
      </QueryClientProvider>
    </div>
  );
}
