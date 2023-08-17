import Head from "next/head";
import Logo from "@/images/logo.svg";
import StarIcon from "@/images/home/star.svg";
import Image from "next/image";
import globeDoodle from "@/images/globe-doodle.png";
import repeatDoodle from "@/images/repeat-doodle.png";
import peopleDoodle from "@/images/people-doodle.png";
import videoDoodle from "@/images/cup-code.png";
import { socialMediaLinks } from "@/utils/social-media";
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
        <section className='c-home__footer'>
          <ul className='c-home__footer__links'>
            <li className='c-home__footer__links__link'>
              <a href='https://gdg.community.dev/gdg-lagos/' target='_blank'>
                Join the community
              </a>
            </li>
            <li className='c-home__footer__links__link'>
              <a href='https://policies.google.com/privacy' target='_blank'>
                Privacy policy
              </a>
            </li>
          </ul>
          <Logo className='c-home__footer__logo' />
          <div className='c-home__footer__social-media'>
            <p className='c-home__footer__social-media__title'>Follow us on:</p>
            <ul className='c-home__footer__social-media__links'>
              {socialMediaLinks.map((link) => (
                <li key={link.link}>
                  <a
                    href={link.link}
                    target='_blank'
                    className='c-home__footer__social-media__link'
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
