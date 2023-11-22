import { StaticImport } from "next/dist/shared/lib/get-img-props";
import danielImage from "@/images/team/daniel.jpg";
import ijeomaImage from "@/images/team/ijeoma.jpg";
import iyinImage from "@/images/team/iyin.jpg";
import lereImage from "@/images/team/lere.jpg";
import lukmonImage from "@/images/team/lukmon.jpg";
import maryannImage from "@/images/team/maryann.jpg";
import nazaImage from "@/images/team/naza.jpg";
import nifemiImage from "@/images/team/nifemi.jpg";
import samuelImage from "@/images/team/samuel.jpg";
import sebastineImage from "@/images/team/sebastine.jpg";
import sodiqImage from "@/images/team/sodiq.jpg";
import tobiImage from "@/images/team/tobi.jpg";
import ziaImage from "@/images/team/zia.jpg";
import asakeImage from "@/images/team/music/asake.png";
import tokyoImage from "@/images/team/music/tokyo.png";
import commandoImage from "@/images/team/music/commando.png";
import obinigweImage from "@/images/team/music/obinigwe.jpeg";
import creatureImage from "@/images/team/music/creature.png";
import johaImage from "@/images/team/music/joha.png";
import somewhereImage from "@/images/team/music/somewhere.png";
import tearsImage from "@/images/team/music/tears.png";
import btsImage from "@/images/team/music/bts.png";
import jdImage from "@/images/team/jd.jpg";
import akinImage from "@/images/team/akin.jpg";
import femiImage from "@/images/team/femi.jpg";
import funmiImage from "@/images/team/funmi.jpg";
import karenImage from "@/images/team/karen.jpg";
import o2Image from "@/images/team/music/o2.png";
import idkImage from "@/images/team/music/idk.png";
import marvinImage from "@/images/team/marvin.jpg";
import tobijuImage from "@/images/team/tobiju.jpg";
import solomonImage from "@/images/team/solomon.jpg";
import growImage from "@/images/team/music/grow.png";
import dDayImage from "@/images/team/music/d-day.png";
import ollieImage from "@/images/team/music/ollie.png";
import giantsImage from "@/images/team/music/giants.png";
import omorinsolaImage from "@/images/team/omorinsola.jpg";
import victoryImage from "@/images/team/music/victory.png";
import championImage from "@/images/team/music/champion.png";
import babydollImage from "@/images/team/music/babydoll.png";
import hindsightImage from "@/images/team/music/hindsight.png";
import inControlImage from "@/images/team/music/in-control.png";
import canTellMeNothingImage from "@/images/team/music/cant-tell-me-nothing.png";
import beneathYourBeautifulImage from "@/images/team/music/beneath-your-beautiful.png";

export type TeamMemberLink = {
  type:
    | "instagram"
    | "twitter"
    | "linkedin"
    | "facebook"
    | "email"
    | "github"
    | "website"
    | "medium"
    | "behance"
    | "substack";
  url: string;
};

export type ITeamMember = {
  key: string;
  name: string;
  role: string;
  comment: string;
  links?: TeamMemberLink[];
  quote: string;
  category: string;
  isLead?: boolean;
  image: StaticImport;
  music: {
    image: StaticImport;
    name: string;
    artist: string;
    url: string;
  };
};

export const teamMembers: ITeamMember[] = [
  {
    key: "sodiq",
    name: "Sodiq Akinjobi",
    role: "Project Manager",
    isLead: true,
    comment:
      "Collaborating with this team was an incredible journey that allowed me to stretch myself and truly enjoy the process. Here’s to more wins and expanding our horizons together! #BigPurr P.S. The camaraderie was so good, it felt like we had a constant supply of N2O in the groups! 🫵🏾🚀",
    links: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/geektutor/",
      },
      {
        type: "twitter",
        url: "https://twitter.com/geektutor",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/geektutor/",
      },
      {
        type: "github",
        url: "https://github.com/github",
      },
      {
        type: "medium",
        url: "https://medium.com/@geektutor",
      },
    ],
    quote:
      "When I go out today, my steps do not end in dark narrow passages nor do I waste time making wrong turns. Amen.",
    category: "gdg-team",
    image: sodiqImage,
    music: {
      image: obinigweImage,
      name: "Obinigwe",
      artist: "Minister GUC",
      url: "https://open.spotify.com/track/1zyQByOXDyQlFYzqTuax5l?si=e75d4aa93b3543e8",
    },
  },
  {
    key: "ijeoma",
    name: "Ijeoma Odiaka",
    role: "Designer",
    comment: "I enjoyed working with these guys. It was fun building Rome and learning new stuffs",
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/sodiqakinjobi",
      },
    ],
    quote: "Do not sacrifice yourself in the altar of “I’m busy”, instead live.",
    category: "design",
    image: ijeomaImage,
    music: {
      image: creatureImage,
      name: "Creature",
      artist: "half alive",
      url: "https://open.spotify.com/track/6tJkq3zUXlEjWluMW9Hdij?si=0409a63e56294435",
    },
  },
  {
    key: "zia",
    name: "Zia Yusuf",
    role: "Content Writer",
    comment:
      "Sodiq is stressful. Lere is a sweet babe. Maryann is the OG. The designers and devs need to enter a room and fight it out🫶🏾",
    quote: "si caelum non potest movere, infernum excitabo",
    category: "content",
    image: ziaImage,
    music: {
      image: tearsImage,
      name: "Tears in the moonlight",
      artist: "Kelechi",
      url: "https://open.spotify.com/track/2MAz9mZH3n9nVGZWUC2VUh?si=817536ce2a6a4fc4",
    },
    links: [
      {
        type: "instagram",
        url: "https://instagram.com/zia_tiffah",
      },
      {
        type: "twitter",
        url: "https://www.twitter.com/zia_tiffah",
      },
    ],
  },
  {
    key: "maryann",
    name: "Maryann Onuoha",
    role: "General Team Lead",
    comment:
      "Working with this team was an amazing journey for me! Here’s is to more wins. #BigPurr",
    quote: "We hope for better days - Kim Namjoon of BTS",
    category: "gdg-team",
    image: maryannImage,
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/maryanneonuoha?s=21&t=jD_36Pj42zh462tKuHOCDg",
      },
    ],
    music: {
      image: btsImage,
      name: "Young Forever",
      artist: "BTS",
      url: "https://open.spotify.com/track/6BskTMfDjXVzeqQHOau5Vi?si=8e3e304df34f476c",
    },
  },
  {
    key: "sebastine",
    name: "Sebastine Odeh",
    role: "Mobile Developer",
    comment: "It was incredible working with these guys!",
    quote: "Learn as if you will live forever, live like you will die tomorrow. - Mahatma Gandhi",
    category: "dev",
    image: sebastineImage,
    music: {
      image: tokyoImage,
      name: "Tokyo Nights",
      artist: "Digital Farm Animals",
      url: "https://open.spotify.com/track/3TxKtkCNR1yQARsvHxvNnP?si=a5e62589435c423e",
    },
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/H3ndrick_",
      },
      {
        type: "github",
        url: "https://github.com/CoderNamedHendrick",
      },
      {
        type: "email",
        url: "sebastinesoacatp@gmail.com",
      },
    ],
  },
  {
    key: "lukmon",
    name: "Lukmon Abdulsalam",
    role: "Web Developer",
    comment:
      "Awemazing work so far, fun filled and dragging each other for fun. Overall great work.",
    quote: "Anything you do, do 100% unless you are donating blood",
    category: "dev",
    image: lukmonImage,
    music: {
      image: johaImage,
      name: "Joha",
      artist: "Asake",
      url: "https://open.spotify.com/track/5UwxpuGHkwiojKDaPC5ZNu?si=b965ba812a0549c1",
    },
    links: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/Lukmon-Abdulsalam",
      },
    ],
  },
  {
    key: "iyin",
    name: "Iyinoluwa Ogundairo",
    role: "Mobile Developer",
    comment:
      "I enjoy the camaraderie and just the efficiency and dedication everyone brings to their role. Lere is a sweet babe too, hehee",
    quote: "Just do it. And if you're afraid, do it afraid.",
    category: "dev",
    image: iyinImage,
    music: {
      image: giantsImage,
      name: "Giants",
      artist: "Dermot Kennedy",
      url: "https://open.spotify.com/track/0l4AReW2LuX0yStPfgQgSR?si=c8a9e62d86e94d23",
    },
    links: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/iyin-ogundairo-877a401aa/",
      },
      {
        type: "email",
        url: "dairoiyin@gmail.com",
      },
      {
        type: "github",
        url: "https://github.com/DairoIyin",
      },
      {
        type: "twitter",
        url: "https://twitter.com/IyinDairo",
      },
    ],
  },
  {
    key: "lere",
    name: "Omolere Asama",
    role: "Content Manager / Web Developer",
    comment:
      "First of, as you have heard, I'm a sweet babe 😌🤚🏾. I always look forward to planning DevFest, it's always a lovely experience working with the team.",
    quote: "Let everything happen to you—beauty and terror. Keep going, nothing is final.",
    category: "dev,content",
    image: lereImage,
    music: {
      image: babydollImage,
      name: "Babydoll",
      artist: "Dominic Fike",
      url: "https://open.spotify.com/track/7yNf9YjeO5JXUE3JEBgnYc?si=e4b85fb602ad45b6",
    },
    links: [
      {
        type: "email",
        url: "temitopeasama@gmail.com",
      },
      {
        type: "github",
        url: "https://www.github.com/TemitopeAsama",
      },
      {
        type: "twitter",
        url: "https://www.x.com/omolxre",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/TemitopeAsama",
      },
    ],
  },
  {
    key: "tobi",
    name: "Oluwatobi Peter Taiwo",
    role: "Frontend Developer",
    comment: "Hardworking and fun team 👉🏽👈🏽",
    quote: "See opportunities in chaos",
    category: "dev",
    image: tobiImage,
    music: {
      image: commandoImage,
      name: "Commando",
      artist: "Ko’rale",
      url: "https://open.spotify.com/track/72cRQRzXJLUM3Rbf1vyxtz?si=2c36f621104c4d79",
    },
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/Dev_Tsticks",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/dev_tsticks/",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/otp/",
      },
      {
        type: "email",
        url: "oluwatobilobapeterschem@gmail.com",
      },
      {
        type: "github",
        url: "https://github.com/Tobipeters",
      },
    ],
  },
  {
    key: "samuel",
    name: "Samuel Abada",
    role: "Mobile Engineer",
    comment: "🦇",
    quote:
      "When you gaze into the abyss, the abyss gazes also into you. Be careful not to blink when it gazes back",
    category: "dev",
    image: samuelImage,
    isLead: true,
    music: {
      image: asakeImage,
      name: "Great Guy",
      artist: "Asake",
      url: "https://open.spotify.com/track/16aRxdbEl0smktrm0hK0eX?si=b3986e29b1db4c9d",
    },
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/mastersam_",
      },
      {
        type: "github",
        url: "https://github.com/mastersam07",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/abada-samuel",
      },
    ],
  },
  {
    key: "naza",
    name: "Chinaza Icheke",
    role: "Product Designer",
    comment:
      "It has been an incredible experience! The team is always pushing everyone to get better and to improve. Amazing people every single one of them.",
    quote:
      "When you are at your weakest, and fear, and doubt, or a burden too heavy to bear, remember this, you are not alone",
    category: "design",
    isLead: true,
    image: nazaImage,
    links: [
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/chinaza-i-329947a5/",
      },
      {
        type: "twitter",
        url: "https://twitter.com/IchekeChinaza",
      },
      {
        type: "website",
        url: "https://bit.ly/32LWrIa",
      },
    ],
    music: {
      image: victoryImage,
      name: "Victory",
      artist: "Two Steps From Hell",
      url: "https://open.spotify.com/track/2F9xBxKbx2M0pbgtSu8fLf?si=9ea2561265e5477d",
    },
  },
  {
    key: "daniel",
    name: "Aghahowa Daniel",
    role: "UX Designer",
    comment: "I’m already there DevFest 2024",
    quote: "Make good great",
    category: "design",
    image: danielImage,
    music: {
      image: somewhereImage,
      name: "Somewhere Only We Know",
      artist: "MADAX",
      url: "https://open.spotify.com/track/52QBHz2VLVpp4dzsAe4Lpv?si=529664f02adf49b7",
    },
    links: [
      {
        type: "twitter",
        url: "https://mobile.twitter.com/aghahowadaniel",
      },
      {
        type: "website",
        url: "Userman.webflow.io",
      },
    ],
  },
  {
    key: "nifemi",
    name: "Oluwanifemi Adeyemi",
    role: "Frontend Developer",
    comment:
      "The designers have brilliant ideas and collaborating with them has been very easy. The whole team is fun to work with.",
    quote: "Minima maxima sunt",
    category: "dev",
    isLead: true,
    image: nifemiImage,
    music: {
      image: growImage,
      name: "Grow",
      artist: "Sion",
      url: "https://open.spotify.com/track/03fDmeiWj0nQS3ZHIjfZ9X?si=b9991f28238a4784",
    },
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/N1femi",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/oluwanifemi-adeyemi-600758174/",
      },
    ],
  },
  {
    key: "marvin",
    name: "Marvin Ogah",
    role: "Design",
    comment:
      "The team's Rick & Morty-esque, Everyone is Rick, smart with Incredible abilities, can travel galaxies & break the fabric of time to help their comrades, but will drag that same comrade like tiger gen the next second",
    quote:
      "As we let our own light shine, we unconsciously give other people permission to do the same as we are liberated from our own fears.",
    category: "design",
    image: marvinImage,
    music: {
      image: ollieImage,
      name: "Zero to one",
      artist: "Ollie",
      url: "https://open.spotify.com/track/5ttql4WZYAh4LGUSMhQcJc?si=37e232f436c54d19",
    },
    links: [
      {
        type: "twitter",
        url: "https://www.twitter.com/marvinographer",
      },
    ],
  },
  {
    key: "omorinsola",
    name: "Adesanya Omorinsola",
    role: "Software Tester / QA Engineer ",
    comment: "Amazing , proud of the team.",
    quote: "It gets better",
    category: "QA",
    image: omorinsolaImage,
    music: {
      image: o2Image,
      name: "O2",
      artist: "Oxlade",
      url: "https://open.spotify.com/track/5ttql4WZYAh4LGUSMhQcJc?si=37e232f436c54d19",
    },
    links: [
      {
        type: "twitter",
        url: "https://www.twitter.com/rynsola__",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/adesanya-omorinsola-76aab6174/",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/omo.rinsola?igshid=MzMyNGUyNmU2YQ==",
      },
      {
        type: "substack",
        url: "https://open.substack.com/pub/omorinsola/p/friendships-that-shapes-our-lives?r=1zfo97&utm_campaign=post&utm_medium=web",
      },
    ],
  },
  {
    key: "akin",
    name: "Akin Aguda",
    role: "Frontend Developer",
    comment:
      "I'm grateful to the FE team and the design team. I got to express myself creatively through the excellent design and great codebase and infrastructure that the other Devs had worked on.",
    quote: "Jesus saved my life",
    category: "dev",
    image: akinImage,
    music: {
      image: hindsightImage,
      name: "Hindsight ",
      artist: "Hillsong Young & Free",
      url: "https://open.spotify.com/track/24ql1HeqRrvruTLE8wPnSj?si=563b10cb0c9a46f6",
    },
    links: [
      {
        type: "github",
        url: "https://github.com/AkinAguda",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/akinaguda",
      },
    ],
  },
  {
    key: "tobiju",
    name: "Oluwatobiju Judah",
    role: "Frontend Developer",
    comment: "fun people doing excellent work 🪐",
    quote: "c'est la vie, n'est-ce pas?",
    category: "QA",
    image: tobijuImage,
    music: {
      image: idkImage,
      name: "IDK",
      artist: "Mosss",
      url: "https://open.spotify.com/track/6NrwVoFmjeNsEtrgZTMo4T?si=790f8168688747b1",
    },
    links: [
      {
        type: "github",
        url: "https://github.com/Tobijudah",
      },
      {
        type: "twitter",
        url: "https://twitter.com/tobijudah",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/oluwatobiju-judah-omotosho/",
      },
      {
        type: "medium",
        url: "https://tobiju.medium.com/",
      },
    ],
  },
  {
    key: "funmi",
    name: "Funmilayo Kanmodi",
    role: "Content Writer",
    comment:
      "Planning DevFest this year has been fun and exciting with this team! We put in the work to make sure you have the best experience.",
    quote: "Tough times never last, Only tough people do brrrrrrrrrr!!!!!!!!!",
    category: "content",
    image: funmiImage,
    music: {
      image: dDayImage,
      name: "D-Day",
      artist: "Agust D",
      url: "https://open.spotify.com/track/22W6wI4hDTjMAYKKBQW9dU?si=cdd19fc1b5d04fec",
    },
    links: [
      {
        type: "email",
        url: "Kanmodihqmat@gmail.com",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/fooomey/",
      },
      {
        type: "twitter",
        url: "https://twitter.com/Fooomey",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/funmilayo-kanmodi-589915153/",
      },
      {
        type: "medium",
        url: "https://funmilayokanmodi.medium.com/",
      },
    ],
  },
  {
    key: "solomon",
    name: "Solomon Ayodele",
    role: "Backend Developer",
    comment: "The work has been interesting and fun",
    quote: "In everything, do to others what you would have them to do to you",
    category: "dev",
    image: solomonImage,
    music: {
      image: inControlImage,
      name: "In Control",
      artist: "Hillsong Worship",
      url: "https://open.spotify.com/track/2XXXk54soacKXmnUYUbMKE?si=7fdeeeeba1194b2ac",
    },
    links: [
      {
        type: "facebook",
        url: "https://web.facebook.com/solomon.ayodele.o",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/solomonayodeleo/",
      },
      {
        type: "twitter",
        url: "https://x.com/_dev_solo",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/solomonayodeleo/",
      },
      {
        type: "website",
        url: "https://linktr.ee/solomonayodeleo",
      },
    ],
  },
  {
    key: "karen",
    name: "Karen Chukwu",
    role: "Co-Organiser (Partnerships & Legal Team Lead)",
    comment:
      "I've had an amazing time on the team identifying and working with our strategic partners and sponsors. My goal everyday is to ensure that our work is sustained by working with our partners and sponsors to ensure that our objectives at GDG Lagos are met. I love how my role cuts across two things I am passionate about, People & Law. ",
    quote: `"Success isn't always about greatness. It's about consistency.`,
    category: "gdg-team",
    image: karenImage,
    music: {
      image: beneathYourBeautifulImage,
      name: "Beneath your Beautiful",
      artist: "Labrinth ft Emeli Sandé",
      url: "https://open.spotify.com/track/2EcsgXlxz99UMDSPg5T8RF?si=30d2699a5470473a",
    },
    links: [
      {
        type: "instagram",
        url: "https://www.instagram.com/Karen_Amarii/",
      },
      {
        type: "twitter",
        url: "https://twitter.com/Karen_Amarii",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/karen-chukwu",
      },
      {
        type: "website",
        url: "https://www.katwiganddale.com/team ",
      },
    ],
  },
  {
    key: "femi",
    name: "Oluwafemi Peters",
    role: "Sidekick",
    comment: "",
    quote: "Be gentle.",
    category: "gdg-team",
    image: femiImage,
    music: {
      image: canTellMeNothingImage,
      name: "Can't tell me nothing",
      artist: "Kanye West",
      url: "https://open.spotify.com/track/0mEdbdeRFQwBhN4xfyIeUM?si=8a5bda1f13b8418a",
    },
    links: [
      {
        type: "github",
        url: "https://github.com/olayinkapeter",
      },
      {
        type: "medium",
        url: "https://medium.com/@olayinkapeter",
      },
      {
        type: "twitter",
        url: "https://twitter.com/olayinkapeter_",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/olayinkapeter/",
      },
      {
        type: "website",
        url: "https://coffeewithpeter.com",
      },
    ],
  },
  {
    key: "jd",
    name: "Jesudetan Onasanya",
    role: "Co-organizer",
    comment: "",
    quote: '"The best way to predict the future is to create it." - Abraham Lincoln',
    category: "gdg-team",
    image: jdImage,
    music: {
      image: championImage,
      name: "Champion",
      artist: "Dante Bowe",
      url: "https://open.spotify.com/track/2YRx8jviX9HnvxD0uDIOma?si=de5bf724ffa744f9",
    },
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/jaydeecassidy",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/jesudetan-onasanya/",
      },
      {
        type: "instagram",
        url: "https://www.instagram.com/jaydee_cassidy/",
      },
    ],
  },
];
