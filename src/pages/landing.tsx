import { SEO } from "@/components/seo";
import React, { useEffect, useState } from "react";
import { PrimaryButton, TertiaryButton } from "@/components/button";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import { HomepageScene } from "@/components/homepage/scene/scene";
import sponsorImage from "@/images/landing/sponsor.png";
import Image from "next/image";
import GoogleIcon from "@/images/landing/sponsor/google.svg";
import SpotifyIcon from "@/images/landing/sponsor/spotify.svg";
import LyftIcon from "@/images/landing/sponsor/lyft.svg";
import FacebookIcon from "@/images/landing/sponsor/facebook.svg";
import songCoverImage from "@/images/landing/song-cover.png";
import SpotifyLyricIcon from "@/images/landing/spotify.svg";
import scribbleImage from "@/images/landing/scribble.png";
import InviteLogo from "@/images/landing/logo.svg";
import ArrowRightDark from "@/images/arrow-right-dark-bg.svg";
import recapDoodleImage from "@/images/landing/recap-doodle.png";
import SpeakerCard from "@/components/speaker/speaker";
import FAQ from "@/components/faq/FAQ";
import Footer from "@/components/footer";
import Menu from "@/components/menu/menu";
import { speakers } from "@/mock-data";
import { Speaker } from "@/types/Speaker";
import { Talks } from "@/components/talks-section/talks";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const topics = [
  [
    {
      emoji: "🎨",
      topic: "Design",
      color: "#EEE4DD",
    },
    {
      emoji: "📊",
      topic: "Blockchain",
      color: "#FFD4CC",
    },
    {
      emoji: "🖼️",
      topic: "Frontend",
      color: "#FDCCFF",
    },
  ],
  [
    {
      emoji: "🪛",
      topic: "Backend",
      color: "#EEEBDD",
    },
    {
      emoji: "☯️",
      topic: "Mental Health",
      color: "#CCF4FF",
    },
    {
      emoji: "⭐",
      topic: "Leadership",
      color: "#FFE2CC",
    },
  ],
  [
    {
      emoji: "💼",
      topic: "Product Management",
      color: "#E6DDEE",
    },
    {
      emoji: "🛡️",
      topic: "Cybersecurity",
      color: "#FFEBCC",
    },
  ],
  [
    {
      emoji: "♠️",
      topic: "Networking",
      color: "#FDCCFF",
    },
    {
      emoji: "✨",
      topic: "DevOps",
      color: "#CCF8FF",
    },
    {
      emoji: "📉",
      topic: "Big Data",
      color: "#EFEFDC",
    },
  ],
];

export default function Landing() {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  const handleChangeSpeaker = (index: number) => (direction: "next" | "previous") => {
    if (direction === "next") {
      setActiveSpeaker(speakers[index + 1]);
    }

    if (direction === "previous") {
      setActiveSpeaker(speakers[index - 1]);
    }
  };

  useEffect(() => {
    if (!activeSpeaker) enableBodyScroll(document.body);
    else disableBodyScroll(document.body);
  }, [activeSpeaker]);

  return (
    <>
      <SEO
        title='Devfest Lagos 2023 | Early Bird Tickets'
        description='Welcome to the official Coming Soon website for DevFest Lagos 2023. DevFest Lagos is an annual  tech conference hosted by Google Developer Groups Lagos. Be there 🫵🏾'
        keywords='gdg lagos, devfest, devfest lagos, devfest lagos 2023'
        image='/og-images/coming-soon.png'
      />
      <div className='landing-page'>
        <Menu />
        <section className='landing-page__intro'>
          <div className='landing-page__intro__title'>
            <h1 className='landing-page__intro__title__text'>
              DevFest <br /> Lagos
            </h1>
            <div className='landing-page__intro__title__presents'>GDG Lagos Presents</div>
          </div>
          <p className='landing-page__intro__description'>
            The biggest tech event in sub-saharan Africa is back and even bigger and better!
          </p>
          <PrimaryButton>
            <span>Get Your Ticket</span>
            <ArrowRight />
          </PrimaryButton>
          <HomepageScene />
          <div className='landing-page__intro__sponsor-cta'>
            <Image quality={100} src={sponsorImage} alt='Sponsor' />
          </div>
        </section>
        <section className='landing-page__better'>
          <h3 className='landing-page__better__title'>
            When we said <span className='green'>better</span>, we weren’t joking!
          </h3>
          <p className='landing-page__better__subtext'>Here are our headline sponsors</p>
          <div className='landing-page__better__sponsors'>
            <GoogleIcon />
            <SpotifyIcon />
            <LyftIcon />
            <FacebookIcon />
          </div>
        </section>
        <section className='landing-page__hype'>
          <div className='landing-page__hype__yarns'>
            <div className='landing-page__hype__yarns__lyric'>
              <div className='landing-page__hype__yarns__lyric__song-deets'>
                <div className='landing-page__hype__yarns__lyric__cover-image'>
                  <Image src={songCoverImage} alt='Rich Flex Cover Image' />
                </div>
                <div>
                  <p className='landing-page__hype__yarns__lyric__title'>Rich Flex</p>
                  <p className='landing-page__hype__yarns__lyric__artist'>Drake</p>
                </div>
              </div>
              <div className='landing-page__hype__yarns__lyric__line'>
                <div className='twennyone'>
                  <Image src={scribbleImage} alt='Scribble' className='scribble' />
                  21
                </div>
                , can you do some’ for me?{" "}
                <div className='twennyone second'>
                  <Image src={scribbleImage} alt='Scribble' className='scribble' />
                  (21)
                </div>
              </div>
              <SpotifyLyricIcon className='landing-page__hype__yarns__lyric__spotify' />
            </div>
            <p className='landing-page__hype__yarns__intro'>After an amazing event last year,</p>
            <p className='landing-page__hype__yarns__subtext'>
              We are back to do so much more and we look forward to showing you what we have in
              store.
            </p>
            <PrimaryButton>
              <span>Get Your Ticket</span> <ArrowRightDark />
            </PrimaryButton>
          </div>
          <div className='landing-page__hype__categories'>
            <p className='landing-page__hype__categories__title'>
              23x or nothing this year, all out or all home
            </p>
            <p className='landing-page__hype__categories__subtext'>
              We have prepared a host of topics and speakers for you! Lots of food and we are not
              talking groceries 🌚
            </p>
            <div className='landing-page__hype__categories__button-wrapper'>
              <PrimaryButton>
                <span>Register Now</span>
                <ArrowRight />
              </PrimaryButton>
            </div>
            {topics.map((topicRow, i) => (
              <div key={i} className='landing-page__hype__categories__topics-row'>
                {topicRow.map((topic) => (
                  <div
                    key={topic.topic}
                    className='landing-page__hype__categories__topic'
                    style={{ background: topic.color }}
                  >
                    <span>{topic.emoji}</span>
                    <span>{topic.topic}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className='landing-page__recap'>
          <div className='landing-page__recap__top'>
            <h3 className='landing-page__recap__title'>
              Last year&apos;s edition was like no other.
            </h3>
            <p className='landing-page__recap__subtext'>
              With your support, we&apos;re about to raise the bar even higher this year!
            </p>
          </div>
          <div className='landing-page__recap__video'>
            <Image src={recapDoodleImage} alt='Recap' layout='fill' />
          </div>
        </section>
        <section className='landing-page__speakers'>
          <p className='landing-page__speakers__count'>41</p>
          <p className='landing-page__speakers__speakers-text'>Speakers</p>
          <p className='landing-page__speakers__subtext'>All ready to cut soap for you!</p>
          <div className='landing-page__speakers__speakers'>
            {speakers.map((speaker, index) => (
              <SpeakerCard
                speaker={speaker}
                key={index}
                onClick={() => setActiveSpeaker(speaker)}
                onClose={() => setActiveSpeaker(null)}
                hasNext={index < speakers.length - 1}
                hasPrevious={index > 0}
                onClickButton={handleChangeSpeaker(index)}
                modalIsOpen={activeSpeaker === speaker}
              />
            ))}
          </div>
          <PrimaryButton href='/speakers'>
            <span>View All Speakers</span>
            <ArrowRight />
          </PrimaryButton>
          <div className='landing-page__speakers__hype-banner'>
            <div className='landing-page__speakers__hype-banner__item visible'>
              {Array.from({ length: 5 }).map(() => (
                <>
                  <span>🔥</span>
                  <span>REGISTER NOW</span>
                  <span>LIMITED TICKETS AVAILABLE</span>
                </>
              ))}
            </div>
            <div className='landing-page__speakers__hype-banner__item faded'>
              {Array.from({ length: 5 }).map(() => (
                <>
                  <span>🔥</span>
                  <span>REGISTER NOW</span>
                  <span>LIMITED TICKETS AVAILABLE</span>
                </>
              ))}
            </div>
          </div>
        </section>
        <Talks />
        <section className='landing-page__faq'>
          <h3 className='landing-page__faq__title'>Lets answer some of your burning questions</h3>
          <p className='landing-page__faq__subtext'>
            Check out our most asked questions here, mfjpm 😑🤚🏾
          </p>
          <div className='landing-page__faq__questions'>
            <FAQ
              question='How can we get TSticks to do giveaway by morning?'
              answer='Threaten him ez'
            />
            <FAQ
              question='How can we get TSticks to do giveaway by morning?'
              answer='Threaten him ez'
            />
            <FAQ
              question='How can we get TSticks to do giveaway by morning?'
              answer='Threaten him ez'
            />
            <FAQ
              question='How can we get TSticks to do giveaway by morning?'
              answer='Threaten him ez'
            />
          </div>
        </section>
        <section className='landing-page__no-matter-what'>
          <h4 className='landing-page__no-matter-what__title'>
            We are looking forward to hosting you again at
          </h4>
          <InviteLogo className='landing-page__no-matter-what__logo' />
          <p className='landing-page__no-matter-what__question'>Will you be there?</p>
          <TertiaryButton className='landing-page__no-matter-what__button'>
            I will be there no matter what
          </TertiaryButton>
        </section>
        <Footer />
      </div>
    </>
  );
}
