/* eslint-disable */
import { SEO } from "@/components/seo";
import React, { useEffect, useRef, useState } from "react";
import GoogleIcon from "@/images/landing/sponsor/google.svg";
import AndelaIcon from "@/images/landing/sponsor/andela.png";
import BluechipIcon from "@/images/landing/sponsor/bluechip.png";
import GeegpayIcon from "@/images/landing/sponsor/geegpay.png";
import IntmaxIcon from "@/images/landing/sponsor/intmax.png";
import KatwigIcon from "@/images/landing/sponsor/katwig.png";
import OktaIcon from "@/images/landing/sponsor/okta.svg";
import PaystackIcon from "@/images/landing/sponsor/paystack.svg";
import PostmanIcon from "@/images/landing/sponsor/postman.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { fetchCategories, fetchSessions, fetchSpeakers } from "@/requests/general";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "@/types/Session";
import { Category } from "@/types/Category";
import { Speaker } from "@/types/Speaker";
import Menu from "@/components/menu/menu";
import Image from "next/image";
import dotsDoodle from "@/images/landing/doodles/dots.png";
import cloudsDoodle from "@/images/landing/doodles/cloud.png";
import { PrimaryButton } from "@/components/button";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import { HomepageScene } from "@/components/homepage/scene/scene";
import appDownloadImage from "@/images/landing/sponsor.png";
import { ticketsUrl } from "@/utils/urls";
import { classNames } from "@/utils/classNames";
import songCoverImage from "@/images/landing/song-cover.png";
import scribbleImage from "@/images/landing/scribble.png";
import SpotifyLyricIcon from "@/images/landing/spotify.svg";
import ArrowRightDark from "@/images/arrow-right-dark-bg.svg";
import CategoryPill from "@/components/category-pill/category-pill";
import { YoutubePlayer } from "@/components/youtube-player";
import SparkleIcon from "@/images/landing/doodles/sparkle.svg";
import speakerMemojiLeft from "@/images/landing/doodles/speaker-memoji.png";
import speakerMemojiRight from "@/images/landing/doodles/speaker-memoji-2.png";
import repeatDoodle from "@/images/landing/doodles/repeat.png";
import SpeakerCard from "@/components/speaker/speaker";
import { getSpeakerSession } from "@/utils/getSpeakerSession";

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

const sponsors = [
  [GoogleIcon, PostmanIcon],
  [
    OktaIcon,
    {
      image: IntmaxIcon,
    },
  ],
  [
    {
      image: GeegpayIcon,
    },
  ],
  [
    PaystackIcon,
    {
      image: KatwigIcon,
    },
    {
      image: BluechipIcon,
    },
    {
      image: AndelaIcon,
    },
  ],
];

export default function Landing({
  sessions,
  speakers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const isInitialized = useRef(false);

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

  // useEffect(() => {
  //   if (!isInitialized.current) {
  //     new LandingPage();
  //
  //     isInitialized.current = true;
  //   }
  // }, []);

  return (
    <>
      <SEO
        title='Homepage'
        description='Welcome to the official website for DevFest Lagos 2023. DevFest Lagos is an annual  tech conference hosted by Google Developer Groups Lagos. Be there 🫵🏾'
      />
      <div className='landing-page'>
        <Menu />
        <section className='landing-page__intro'>
          <div className='landing-page__intro__title'>
            <h1 className='landing-page__intro__title__text'>
              <span>
                <span data-animate-y-full data-delay='.167' data-easing='LANDING_TITLE'>
                  DevFest
                </span>
              </span>{" "}
              <span>
                <span data-animate-y-full data-delay='.167' data-easing='LANDING_TITLE'>
                  Lagos
                </span>
              </span>
            </h1>
            <Image
              src={dotsDoodle}
              alt='doodle'
              className='landing-page__intro__title__dots'
              data-landing-doodle
            />
            <Image
              src={cloudsDoodle}
              alt='doodle'
              className='landing-page__intro__title__cloud-left'
              data-landing-doodle
            />
            <Image
              src={cloudsDoodle}
              alt='doodle'
              className='landing-page__intro__title__cloud-right'
              data-landing-doodle
            />
            <div className='landing-page__intro__title__presents' data-fade-in data-gdg-presents>
              GDG Lagos Presents
            </div>
          </div>
          {/*<span>*/}
          {/*  </span>*/}
          <p
            className='landing-page__intro__description'
            data-animate-sentences
            data-delay={0.333}
            data-easing='LANDING_DESCRIPTION'
          >
            The biggest tech event in sub-saharan Africa is back and even bigger and better!
            {/*<div className='landing-page__intro__memoji'>*/}
            {/*  <Image src={memojiDoodle} alt='doodle' quality={100} />*/}
            {/*</div>*/}
          </p>
          <PrimaryButton
            href={ticketsUrl}
            isExternal
            data-animate-button
            className='landing-page__intro__button'
          >
            <span>Get Your Ticket</span>
            <ArrowRight />
          </PrimaryButton>
          <HomepageScene />
          <a href='/app' target='_blank'>
            <Image
              src={appDownloadImage}
              className='landing-page__intro__sponsor-cta'
              alt='Download Our App'
            />
          </a>
        </section>
        <section className='landing-page__better' data-better-section>
          <h3
            className='landing-page__better__title'
            data-animate-sentences
            data-easing='SPONSOR_BETTER'
          >
            When we said better, we weren’t joking!
          </h3>
          <p
            className='landing-page__better__subtext'
            data-animate-y-full
            data-add-span
            data-easing='SPONSOR_BETTER'
            data-delay='.167'
          >
            Here are our headline sponsors
          </p>
          <div className='landing-page__better__sponsors'>
            {sponsors.map((sponsorRow, index) => {
              const isBronzeRow = index === sponsors.length - 1;
              const isSilverRow = index === sponsors.length - 2;

              return (
                <>
                  {sponsorRow.map((Sponsor, subIndex) => {
                    let content;
                    const delay = 0.25 + 0.104 * index;
                    const className = classNames(
                      isBronzeRow && "landing-page__better__sponsors__bronze",
                      isSilverRow && "landing-page__better__sponsors__silver",
                    );

                    if (Sponsor.image) {
                      content = (
                        <Image
                          src={Sponsor.image}
                          alt='Sponsor'
                          className={className}
                          data-animate-y-full
                          data-delay={delay}
                          data-easing='SPONSOR_BETTER'
                        />
                      );
                    } else {
                      content = (
                        <Sponsor
                          className={className}
                          data-animate-y-full
                          data-delay={delay}
                          data-easing='SPONSOR_BETTER'
                        />
                      );
                    }

                    return (
                      <span
                        key={`${index}-${subIndex}`}
                        className='landing-page__better__sponsors__img-wrapper'
                      >
                        {content}
                      </span>
                    );
                  })}
                  {!isBronzeRow && <span className='break-row'></span>}
                </>
              );
            })}
          </div>
        </section>
        <section className='landing-page__hype' data-section-delay='.6'>
          <canvas className='landing-page__hype__canvas' data-animate-canvas />
          <div className='landing-page__hype__yarns' data-hide-for-canvas>
            <div className='landing-page__hype__yarns__lyric' data-fade-in data-animate-y='+50'>
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
            <p
              className='landing-page__hype__yarns__intro'
              data-animate-sentences
              data-easing='NO_MATTER_WHAT'
              data-delay='.417'
            >
              After an amazing event last year,
            </p>
            <p
              className='landing-page__hype__yarns__subtext'
              data-animate-sentences
              data-easing='NO_MATTER_WHAT'
              data-delay='.583'
            >
              We are back to do so much more and we look forward to showing you what we have in
              store.
            </p>
            <PrimaryButton data-animate-button data-delay='1.2' isExternal>
              <span>Get Your Ticket</span> <ArrowRightDark />
            </PrimaryButton>
          </div>
          <div className='landing-page__hype__categories' data-fade-in data-animate-y='+50'>
            <p
              className='landing-page__hype__categories__title'
              data-animate-sentences
              data-easing='HYPE'
              data-delay='.25'
            >
              23x or nothing this year, all out or all home
            </p>
            <p
              className='landing-page__hype__categories__subtext'
              data-animate-sentences
              data-easing='HYPE'
              data-delay='.417'
            >
              We have prepared a host of topics and speakers for you! Lots of food and we are not
              talking groceries 🌚
            </p>
            <div className='landing-page__hype__categories__button-wrapper'>
              <PrimaryButton data-animate-button data-delay='1.7' isExternal>
                <span>Register Now</span>
                <ArrowRight />
              </PrimaryButton>
            </div>
            {topics.map((topicRow, i) => (
              <div key={i} className='landing-page__hype__categories__topics-row'>
                {topicRow.map((topic) => (
                  <CategoryPill
                    isActive
                    activeBgColor={topic.color}
                    key={topic.topic}
                    className='landing-page__hype__categories__topic'
                  >
                    <span>{topic.emoji}</span>
                    <span>{topic.topic}</span>
                  </CategoryPill>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section data-recap-section className='landing-page__recap'>
          <div className='landing-page__recap__top'>
            <h3
              className='landing-page__recap__title'
              data-animate-sentences
              data-easing='LANDING_TITLE'
            >
              Last year&apos;s edition was like no other.
            </h3>
            <p
              className='landing-page__recap__subtext'
              data-animate-sentences
              data-delay={0.167}
              data-easing='LANDING_TITLE'
            >
              With your support, we&apos;re about to raise the bar even higher this year!
            </p>
          </div>
          <div
            className='landing-page__recap__video'
            data-delay='.35'
            data-fade-in
            data-animate-y='+200'
            data-easing='RECAP_VIDEO'
          >
            <YoutubePlayer videoId='7kat5HlPtzU' />
          </div>
        </section>
        <section className='landing-page__speakers' data-speakers-section>
          <div style={{ position: "relative" }}>
            <SparkleIcon data-fade-in className='landing-page__speakers__sparkle' />
            <p
              className='landing-page__speakers__count'
              data-animate-y-full
              data-add-span
              data-easing='SPEAKERS_TITLE'
            >
              {speakers.length}
            </p>
          </div>
          <div className='landing-page__speakers__speakers-wrapper'>
            <Image
              src={speakerMemojiLeft}
              alt='doodle'
              className='landing-page__speakers__memoji-left'
              data-speaker-memoji
            />
            <Image
              src={speakerMemojiRight}
              alt='doodle'
              className='landing-page__speakers__memoji-right'
              data-speaker-memoji
            />
            <p
              className='landing-page__speakers__speakers-text'
              data-animate-y-full
              data-add-span
              data-easing='SPEAKERS_TITLE'
              data-delay='.83'
            >
              Speakers
            </p>
          </div>
          <div className='landing-page__speakers__subtext'>
            <Image
              data-speaker-doodle
              src={repeatDoodle}
              alt='doodle'
              className='landing-page__speakers__repeat'
            />
            <Image
              data-speaker-doodle
              src={cloudsDoodle}
              alt='doodle'
              className='landing-page__speakers__cloud'
            />
            <p data-animate-y-full data-add-span data-easing='GDG_OPACITY' data-delay='.167'>
              All ready to cut soap for you!
            </p>
          </div>
          <div className='landing-page__speakers__speakers'>
            <div className='active inner' data-marquee-list>
              {speakers.map((speaker, index) => (
                <div key={index} data-marquee-item data-speaker-card>
                  <SpeakerCard
                    speaker={speaker}
                    onClick={() => setActiveSpeaker(speaker)}
                    onClose={() => setActiveSpeaker(null)}
                    hasNext={index < speakers.length - 1}
                    hasPrevious={index > 0}
                    onClickButton={handleChangeSpeaker(index)}
                    modalIsOpen={activeSpeaker === speaker}
                    session={getSpeakerSession({ speaker, sessions })}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = (async () => {
  const [sessions, categories, speakers] = await Promise.all([
    fetchSessions(),
    fetchCategories(),
    fetchSpeakers(),
  ]);

  return { props: { sessions, categories, speakers } };
}) satisfies GetStaticProps<{
  sessions: Session[];
  categories: Category[];
  speakers: Speaker[];
}>;

Landing.disableLayout = true;
