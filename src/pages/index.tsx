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
import LogoWithGDG from "@/images/logo-with-gdg.svg";
import { socialMediaLinks } from "@/utils/social-media";

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
          <figure className='c-home__recap__image-1'>
            <Image src={recap1} alt='Recap Image' fill quality={100} />
          </figure>
          <figure className='c-home__recap__image-2'>
            <Image src={recap2} alt='Recap Image' fill quality={100} />
          </figure>
          <figure className='c-home__recap__image-3'>
            <Image src={recap3} alt='Recap Image' fill quality={100} />
          </figure>
          <figure className='c-home__recap__image-4'>
            <Image src={recap4} alt='Recap Image' fill quality={100} />
          </figure>
          <figure className='c-home__recap__image-5'>
            <Image src={recap5} alt='Recap Image' fill quality={100} />
          </figure>
          <figure className='c-home__recap__image-6'>
            <Image src={recap6} alt='Recap Image' fill quality={100} />
          </figure>
        </section>
        <section className='c-home__feedback'>
          <div className='c-home__feedback__body'>
            <div className='c-home__feedback__body-content'>
              <div className='c-home__feedback__body__quotes-row' data-marquee>
                {Array.from({ length: 4 }).map(() => (
                  <>
                    <div className='c-home__feedback__body__feedback-t-1'>
                      <Image src={topTweet1} alt='Devfest Feedback' fill />
                    </div>
                    <div className='c-home__feedback__body__feedback-t-2'>
                      <Image src={topTweet2} alt='Devfest Feedback' fill />
                    </div>
                    <div className='c-home__feedback__body__feedback-t-3'>
                      <Image src={topTweet3} alt='Devfest Feedback' fill />
                    </div>
                    <div className='c-home__feedback__body__feedback-t-4'>
                      <Image src={topTweet4} alt='Devfest Feedback' fill />
                    </div>
                  </>
                ))}
              </div>
              <div className='c-home__feedback__body__quotes-row' data-marquee>
                {Array.from({ length: 4 }).map(() => (
                  <>
                    <div className='c-home__feedback__body__feedback-b-1'>
                      <Image src={bottomTweet1} alt='Devfest Feedback' fill />
                    </div>
                    <div className='c-home__feedback__body__feedback-b-2'>
                      <Image src={bottomTweet2} alt='Devfest Feedback' />
                    </div>
                    <div className='c-home__feedback__body__feedback-b-3'>
                      <Image src={bottomTweet3} alt='Devfest Feedback' />
                    </div>
                    <div className='c-home__feedback__body__feedback-b-4'>
                      <Image src={bottomTweet4} alt='Devfest Feedback' />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className='c-home__highlights'>
          <div className='c-home__highlights__body'>
            <p className='c-home__highlights__title'>Watch the highlight of DevFest2022 😎</p>
            <div className='c-home__highlights__youtube'>
              <YoutubePlayer videoId='7kat5HlPtzU' />
            </div>
            <div className='c-home__highlights__youtube__tease'>
              P.s : You don’t want to miss this year 🤭
            </div>
          </div>
        </section>
        <ComingSoonCountdown />
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
          <LogoWithGDG className='c-home__footer__logo' />
          <div className='c-home__footer__social-media'>
            <p className='c-home__footer__social-media__title'>Follow us on:</p>
            <ul className='c-home__footer__social-media__icons'>
              {socialMediaLinks.map((link) => (
                <li key={link.link}>
                  <a href={link.link} target='_blank'>
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
