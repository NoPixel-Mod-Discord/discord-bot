import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Flowbite>
        <Head>
          <title>NoPixel Mod Discord</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <script
          async
          defer
          data-domains="npbot.tech"
          data-website-id="d0d459b6-67bc-47d0-b2a0-ce7d916f0c83"
          src="https://analytics.bachitterch.com/umami.js"
        ></script>
        <div className="absolute top-6 left-8">
          <DarkThemeToggle />
        </div>
      </Flowbite>
    </SessionProvider>
  );
};

export default MyApp;
