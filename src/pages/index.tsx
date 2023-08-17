import Head from "next/head";
import Logo from "@/images/logo.svg";
import StarIcon from "@/images/home/star.svg";
import Image from "next/image";
import globeDoodle from "@/images/globe-doodle.png";
import repeatDoodle from "@/images/repeat-doodle.png";
import peopleDoodle from "@/images/people-doodle.png";
import videoDoodle from "@/images/cup-code.png";
import arrowDoodle from "@/images/arrow-doodle.png";
import { TertiaryButton } from "@/components/button";
import recap1 from "@/images/home/recap/recap-1.png";
import recap2 from "@/images/home/recap/recap-2.png";
import recap3 from "@/images/home/recap/recap-3.png";
import recap4 from "@/images/home/recap/recap-4.png";
import recap5 from "@/images/home/recap/recap-5.png";
import recap6 from "@/images/home/recap/recap-6.png";
import topTweet1 from "@/images/home/tweets/t-1.png";
import topTweet2 from "@/images/home/tweets/t-2.png";
import topTweet3 from "@/images/home/tweets/t-3.png";
import topTweet4 from "@/images/home/tweets/t-4.png";
import bottomTweet1 from "@/images/home/tweets/b-1.png";
import bottomTweet2 from "@/images/home/tweets/b-2.png";
import bottomTweet3 from "@/images/home/tweets/b-3.png";
import bottomTweet4 from "@/images/home/tweets/b-4.png";
import { YoutubePlayer } from "@/components/youtube-player";
import { ComingSoonCountdown } from "@/components/coming-soon-countdown";
import { socialMediaLinks } from "@/utils/social-media";
import React, { useEffect, useRef } from "react";
import Homepage from "@/animations/components/Homepage";
import HighlightIcon from "@/images/home/highlight.svg";
import { ticketsUrl } from "@/utils/urls";

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
          <figure className='c-home__intro__globe-doodle'>
            <Image src={globeDoodle} alt='People Doodle' fill quality={100} />
          </figure>
          <figure className='c-home__intro__people-doodle'>
            <Image src={peopleDoodle} alt='People Doodle' fill quality={100} />
          </figure>
          <figure className='c-home__intro__repeat-doodle'>
            <Image src={repeatDoodle} alt='Repeat Doodle' fill quality={100} />
          </figure>
          <figure className='c-home__intro__video-doodle'>
            <Image src={videoDoodle} alt='Video Doodle' fill quality={100} />
          </figure>
          <h1 className='c-home__intro__title'>Are you ready for 23x?</h1>
          <p className='c-home__intro__subtext'>
           Wetin you dey find? We never launch.
          </p>
        </section>
        <section className='c-home__marquee-wrapper'>
          <div className='c-home__marquee' data-marquee>
            {Array.from({ length: 32 }).map((_, index) => (
              <div className='c-home__marquee__item' key={index} data-marquee-item>
                <StarIcon className='c-home__marquee__icon' />
                <p className='c-home__marquee__text'>Watch this space for more information soon</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
