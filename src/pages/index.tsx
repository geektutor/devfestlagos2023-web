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
