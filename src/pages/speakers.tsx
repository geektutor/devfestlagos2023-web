import { PrimaryButton } from "@/components/button";
import { ticketsUrl } from "@/utils/urls";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import LandmarkFrontage from "@/images/speakers-page/landmark-frontage.png";
import SpeakerCard from "@/components/speaker/speaker";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import FaqSection from "@/components/faq-section/faq-section";
import { Talks } from "@/components/talks-section/talks";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import Avatar1 from "@/images/speakers-page/avatars/sp_avatar_1.png";
import Avatar2 from "@/images/speakers-page/avatars/sp_avatar_2.png";
import Avatar3 from "@/images/speakers-page/avatars/sp_avatar_3.png";
import ThreeDotsDoodle from "@/images/Doodles.png";
import ArrowDoodle from "@/images/arrow-doodle.png";
import LogicDoodle from "@/images/Logic.png";
import PeopleDoodle from "@/images/people-doodle.png";
import RefreshDoodle from "@/images/repeat-doodle.png";
import { fetchSessions, fetchSpeakers } from "@/requests/general";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "@/types/Session";
import { Speaker } from "@/types/Speaker";
import DaysToggle from "@/components/days-toggle/days-toggle";

export default function Speakers({
  sessions,
  speakers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const handleChangeSpeaker = (index: number) => (direction: "next" | "previous") => {
    if (direction === "next") {
      setActiveSpeaker(speakers[index + 1]);
    }

    if (direction === "previous") {
      setActiveSpeaker(speakers[index - 1]);
    }
  };

  console.log(speakers);

  const daySpeakers = useMemo(() => {
    const targetDay = selectedDay === 1 ? 24 : 25;
    return speakers.filter((speakers) => new Date(speakers.sessionDate).getDate() === targetDay);
  }, [selectedDay, speakers]);

  return (
    <>
      <Head>
        <title>Speakers | Devfest Lagos 2023</title>
      </Head>

      <main className='speakers-page'>
        <section className='speakers_page__hero'>
          <div className='speakers_page__hero__content'>
            <h3 className='speakers_page__hero__content_title'>
              Seasoned speakers sharing industry expertise
            </h3>
            <p className='speakers_page__hero__content_desc'>
              We have selected the best of the best to bring you amazing talks in this year&apos;s
              DevFest
            </p>
            <PrimaryButton href={ticketsUrl} isExternal>
              Get your ticket &emsp; <ArrowRight />
            </PrimaryButton>

            <figure className='speakers_page__hero__content_avatar1'>
              <Image src={Avatar1} alt='Meemoji devfest' quality={100} />
            </figure>
            <figure className='speakers_page__hero__content_avatar2'>
              <Image src={Avatar2} alt='Meemoji devfest' quality={100} />
            </figure>
            <figure className='speakers_page__hero__content_avatar3'>
              <Image src={Avatar3} alt='Meemoji devfest' quality={100} />
            </figure>

            <figure className='speakers_page__hero__content__arrow-doodle'>
              <Image src={ArrowDoodle} alt='People Doodle' fill quality={100} />
            </figure>
            <figure className='speakers_page__hero__content__logic-doodle'>
              <Image src={LogicDoodle} alt='People Doodle' fill quality={100} />
            </figure>
            <figure className='speakers_page__hero__content__refresh-doodle'>
              <Image src={RefreshDoodle} alt='Repeat Doodle' fill quality={100} />
            </figure>
            <figure className='speakers_page__hero__content__dots-doodle'>
              <Image src={ThreeDotsDoodle} alt='Video Doodle' fill quality={100} />
            </figure>
            <figure className='speakers_page__hero__content__people-doodle'>
              <Image src={PeopleDoodle} alt='Video Doodle' fill quality={100} />
            </figure>
          </div>
        </section>
        <section className='speakers_page__info'>
          <div className='speakers_page__info_marquee'>
            <div className='diagonal_two'>
              <div className='speakers_page__info_marquee_back' data-marquee>
                {Array.from({ length: 32 }).map((_, index) => (
                  <div className='speakers-page__marquee_back__item' key={index} data-marquee-item>
                    <p className='speakers-page__marquee_back__text'>
                      &emsp; 🔥 &emsp; REGISTER NOW &emsp; LIMITED TICKETS AVAILABLE
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className='diagonal_one'>
              <div className='speakers_page__info_marquee_front' data-marquee>
                {Array.from({ length: 32 }).map((_, index) => (
                  <div className='speakers_page__marquee_front__item' key={index} data-marquee-item>
                    <p className='speakers_page__marquee_front__text'>
                      &emsp; 🔥 &emsp; REGISTER NOW &emsp; LIMITED TICKETS AVAILABLE
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='card_container container'>
            <div className='speakers_page__info_cards_note'>Remember, Remember</div>
            <div className='speakers_page__info_cards'>
              <div className='speakers_page__info_cards_details'>
                <p className='speakers_page__info_cards_details_caption'>
                  🥂Two Days of Awesomeness
                </p>
                <h3 className='speakers_page__info_cards_details_month'>NOVEMBER</h3>
                <h2 className='speakers_page__info_cards_details_day'>24th and 25th</h2>

                <p className='speakers_page__info_cards_details_subtext'>
                  We will be making history, once again, with you
                </p>
                <PrimaryButton
                  onClick={() => window.open(ticketsUrl, "_blank")}
                  className='speakers_page__info_cards_details_button'
                >
                  Get your ticket <ArrowRight />
                </PrimaryButton>
              </div>

              <div className='speakers_page__info_cards_venue'>
                <div className='speakers_page__info_cards_venue_image'>
                  <Image
                    layout='responsive'
                    src={LandmarkFrontage}
                    alt='Venue Image'
                    objectFit='cover'
                    quality={100}
                  />
                </div>
                <p className='speakers_page__info_cards_venue_caption'>We will be at the </p>
                <h1 className='speakers_page__info_cards_venue_text'>Landmark Event Center</h1>
              </div>
            </div>
          </div>
        </section>
        <section className='speakers_page__speakers'>
          <div className='speakers_page__speakers_header'>
            <h1>Our speakers for this years DevFest</h1>
            <DaysToggle selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          </div>
          <div className='speakers_page__speakers_list'>
            {daySpeakers.map((speaker, index: number) => (
              <SpeakerCard
                key={index}
                speaker={speaker}
                onClick={() => setActiveSpeaker(speaker)}
                onClose={() => setActiveSpeaker(null)}
                hasNext={index < speakers.length - 1}
                hasPrevious={index > 0}
                onClickButton={handleChangeSpeaker(index)}
                modalIsOpen={activeSpeaker === speaker}
              />
            ))}
          </div>
        </section>
        <Talks sessions={sessions} disableAnimation />
        <FaqSection />
        <NoMatterWhat />
      </main>
    </>
  );
}

const DaysTab = () => {
  const Days = ["Day 1", "Day 2"];
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState(0);

  const toggle = (tab: number) => {
    setActive(!active);
    setTab(tab);
  };

  const Style = active
    ? {
        color: "#111",
        borderBottom: "2px solid #111",
        padding: "1rem 3rem",
      }
    : {
        color: "#444",
        border: "none",
      };
  return (
    <div style={{ display: "flex", gap: "1rem", marginRight: "10rem" }}>
      {Days.map((item, idx) => (
        <p style={Style} onClick={() => toggle(tab)} key={idx}>
          {item}
        </p>
      ))}
    </div>
  );
};

export const getStaticProps = (async () => {
  const [sessions, speakers] = await Promise.all([fetchSessions(), fetchSpeakers()]);

  return { props: { sessions, speakers } };
}) satisfies GetStaticProps<{
  sessions: Session[];
  speakers: Speaker[];
}>;
