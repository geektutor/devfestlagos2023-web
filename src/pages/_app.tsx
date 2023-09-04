import "@/styles/index.scss";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import Script from "next/script";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={googleSans.className}>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='alternate icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-26MR8PNK9R' />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-26MR8PNK9R');
        `}
      </Script>
      <Component {...pageProps} />
    </div>
  );
}
