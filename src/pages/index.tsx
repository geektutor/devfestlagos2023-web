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
