import Head from "next/head";
import Logo from "@/images/logo.svg";
import StarIcon from "@/images/home/star.svg";
import React, { useEffect, useRef } from "react";
import Homepage from "@/animations/components/Homepage";

export default function Home() {
  const hasInitializedAnimation = useRef(false);

  useEffect(() => {
    if (hasInitializedAnimation.current) return;

    hasInitializedAnimation.current = true;
    new Homepage();
  }, []);

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
