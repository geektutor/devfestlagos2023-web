import Head from "next/head";
import Logo from "@/images/logo.svg";
import StarIcon from "@/images/home/star.svg";
import Image from "next/image";
import globeDoodle from "@/images/globe-doodle.png";
import repeatDoodle from "@/images/repeat-doodle.png";
import peopleDoodle from "@/images/people-doodle.png";
import videoDoodle from "@/images/cup-code.png";
import arrowDoodle from "@/images/arrow-doodle.png";
import { TertiaryButton } from "@/component/button";

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
          <figure className='c-home__intro__globe-doodle'>
            <Image src={globeDoodle} alt='People Doodle' fill />
          </figure>
          <figure className='c-home__intro__people-doodle'>
            <Image quality={100} src={peopleDoodle} alt='People Doodle' fill />
          </figure>
          <figure className='c-home__intro__repeat-doodle'>
            <Image src={repeatDoodle} alt='Repeat Doodle' fill />
          </figure>
          <figure className='c-home__intro__video-doodle'>
            <Image src={videoDoodle} alt='Video Doodle' fill />
          </figure>
          <h1 className='c-home__intro__title'>Are you ready for 23x?</h1>
          <p className='c-home__intro__subtext'>
            We’re back! And it’s going to be the biggest, fantastic tech festival 🥳 of the year.
            <br />
            Get ready 😎 for <span className='red'>DevFest</span>{" "}
            <span className='blue'>Lagos</span> <span className='yellow'>2023</span>.
          </p>
          <TertiaryButton>Claim Your Ticket</TertiaryButton>
        </section>
        <section className='c-home__marquee-wrapper'>
          <div className='c-home__marquee' data-marquee>
            {Array.from({ length: 32 }).map((_, index) => (
              <div className='c-home__marquee__item' key={index} data-marquee-item>
                <StarIcon />
                <p className='c-home__marquee__text'>Watch this space for more information soon</p>
              </div>
            ))}
          </div>
        </section>
        <section className='c-home__recap'>
          <div className='c-home__recap__title'>
            Let’s recap DevFest 2022
            <figure className='c-home__recap__arrow'>
              <Image src={arrowDoodle} alt='Recap' fill />
            </figure>
          </div>
        </section>
      </main>
    </>
  );
}
