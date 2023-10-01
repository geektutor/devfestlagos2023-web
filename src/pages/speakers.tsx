import { PrimaryButton } from "@/components/button";
import { ticketsUrl } from "@/utils/urls";
import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import LandmarkFrontage from "@/images/speakers-page/landmark-frontage.png";
import SpeakerCard from "@/components/speaker/speaker";
import { speakers } from "@/mock-data";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import FaqSection from "@/components/faq-section/faq-section";
import { Talks } from "@/components/talks-section/talks";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import Avatar1 from "@/images/speakers-page/avatars/Avatar-1.svg";
import Avatar2 from "@/images/speakers-page/avatars/Avatar-20.svg";
import Avatar3 from "@/images/speakers-page/avatars/Memoji Profile Picture.svg";

export default function Speakers() {
  return (
    <>
      <Head>
        <title>Speakers | Devfest Lagos 2023</title>
      </Head>

      <main className='speakers-page'>
        <section className='speakers_page__hero'>
          <h3 className='speakers_page__hero_title'>
            Seasoned speakers sharing industry expertise
          </h3>
          <p className='speakers_page__hero_desc'>
            We have selected the best of the best to bring you amazing talks in this year&apos;s
            DevFest
          </p>
          <PrimaryButton onClick={() => window.open(ticketsUrl, "_blank")}>
            Get your ticket &emsp; <ArrowRight />
          </PrimaryButton>

          <figure className='speakers_page__hero_avatar1'>
            <Avatar1 />
          </figure>
          <figure className='speakers_page__hero_avatar2'>
            <Avatar2 />
          </figure>
          <figure className='speakers_page__hero_avatar3'>
            <Avatar3 />
          </figure>
        </section>
        <section className='speakers_page__info'>
          <div className='speakers_page__info_marquee_front' data-marquee>
            {Array.from({ length: 32 }).map((_, index) => (
              <div className='speakers_page__marquee_front__item' key={index} data-marquee-item>
                <p className='speakers_page__marquee_front__text'>
                  &emsp; 🔥 &emsp; REGISTER NOW &emsp; LIMITED TICKETS AVAILABLE
                </p>
              </div>
            ))}
          </div>
          <div className='speakers_page__info_marquee_back' data-marquee>
            {Array.from({ length: 32 }).map((_, index) => (
              <div className='speakers-page__marquee_back__item' key={index} data-marquee-item>
                <p className='speakers-page__marquee_back__text'>
                  &emsp; 🔥 &emsp; REGISTER NOW &emsp; LIMITED TICKETS AVAILABLE
                </p>
              </div>
            ))}
          </div>
          <div className='speakers_page__info_cards_note'>Remember, Remember</div>
          <ul className='speakers_page__info_cards'>
            <li className='speakers_page__info_cards_details'>
              <p className='speakers_page__info_cards_details_caption'>🥂Two Days of Awesomeness</p>
              <h3 className='speakers_page__info_cards_details_month'>NOVEMBER</h3>
              <h2 className='speakers_page__info_cards_details_day'>24th and 25th</h2>
              <div className='speakers_page__info_cards_details_subtext'>
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
            </li>
            <li className='speakers_page__info_cards_venue'>
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
            </li>
          </ul>
        </section>
        <section className='speakers_page__speakers'>
          <div className='speakers_page__speakers_header'>
            <h1>Our speakers for this years DevFest</h1>
            <DaysTab />
          </div>
          <div className='speakers_page__speakers_list'>
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={index}
                speaker={speaker!}
                hasNext
                hasPrevious
                onClick={() => console.log("Click")}
                onClickButton={() => console.log("Button Clicked")}
                modalIsOpen={false}
                onClose={() => console.log("Close")}
              />
            ))}
          </div>
        </section>
        <Talks />
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
