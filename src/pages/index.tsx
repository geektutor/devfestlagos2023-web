import Head from "next/head";
import Logo from "@/images/logo.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Devfest 2023 Lagos | Coming Soon</title>
      </Head>
      <main className='c-home'>
        <nav className='c-home__nav'>
          <Logo className='c-home__nav__logo' />
        </nav>
        <section className='c-home__intro'>
          <h1 className='c-home__intro__title'>Are you ready for 23x?</h1>
          <p className='c-home__intro__subtext'>
           Wetin you dey find? We never launch.
          </p>
        </section>
      </main>
    </>
  );
}
