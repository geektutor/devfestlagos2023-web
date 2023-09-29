import { StaticImport } from "next/dist/shared/lib/get-img-props";
import danielImage from "@/images/team/daniel.png";
import ijeomaImage from "@/images/team/ijeoma.png";
import iyinImage from "@/images/team/iyin.png";
import joelImage from "@/images/team/joel.png";
import lereImage from "@/images/team/lere.png";
import lukmonImage from "@/images/team/lukmon.png";
import maryannImage from "@/images/team/maryann.png";
import nazaImage from "@/images/team/naza.png";
import nifemiImage from "@/images/team/nifemi.png";
import samuelImage from "@/images/team/samuel.png";
import sebastineImage from "@/images/team/sebastine.png";
import sodiqImage from "@/images/team/sodiq.png";
import tobiImage from "@/images/team/tobi.png";
import ziaImage from "@/images/team/zia.png";
import asakeImage from "@/images/team/music/asake.png";
import caniImage from "@/images/team/music/can-i.png";
import tokyoImage from "@/images/team/music/tokyo.png";
import commandoImage from "@/images/team/music/commando.png";
import convictImage from "@/images/team/music/convict.png";
import creatureImage from "@/images/team/music/creature.png";
import dragonbornImage from "@/images/team/music/dragonborn.png";
import fikeImage from "@/images/team/music/fike.png";
import johaImage from "@/images/team/music/joha.png";
import somewhereImage from "@/images/team/music/somewhere.png";
import tearsImage from "@/images/team/music/tears.png";
import btsImage from "@/images/team/music/bts.png";

export type TeamMemberLink = {
  type:
    | "twitter"
    | "linkedin"
    | "github"
    | "website"
    | "medium"
    | "behance"
    | "facebook"
    | "instagram"
    | "email";
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
    role: "Product Manager",
    comment:
      "Working with this team was an amazing journey for me! Here’s is to more wins. #BigPurr",
    links: [
      {
        type: "twitter",
        url: "https://twitter.com/sodiqakinjobi",
      },
    ],
    quote: "Always be kind to others regardless",
    category: "gdg-team",
    image: sodiqImage,
    music: {
      image: convictImage,
      name: "Ex-Convict",
      artist: "Shallipopi",
      url: "https://open.spotify.com/track/3Q4oVlA6z9TH0jhaDl6aNT?si=16425e0484e84a4f",
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
  },
  {
    key: "maryann",
    name: "Maryann Onuoha",
    role: "GDG Lagos Organizer",
    comment:
      "Working with this team was an amazing journey for me! Here’s is to more wins. #BigPurr",
    quote: "We hope for better days - Kim Namjoon of BTS",
    category: "gdg-team",
    image: maryannImage,
    music: {
      image: btsImage,
      name: "Young Forever",
      artist: "BTS",
      url: "https://open.spotify.com/track/6BskTMfDjXVzeqQHOau5Vi?si=8e3e304df34f476c",
    },
  },
  {
    key: "joel",
    name: "Joel Adewole",
    role: "Content Writer/QA",
    comment: "I love the team spirit and commitment",
    quote: "Don't be too sweet, or people will eat you",
    category: "content",
    image: joelImage,
    music: {
      image: asakeImage,
      name: "Lonely At The Top",
      artist: "Asake",
      url: "https://open.spotify.com/track/5ZtK8XAVnoaGdBXZWCEVCY?si=c64045644dcc44ce",
    },
  },
  {
    key: "sebastine",
    name: "Sebastaine Odeh",
    role: "Mobile Developer",
    comment: "Lere is a sweet babe but my babe's sweeter🙏🏽🙏🏽",
    quote: "God Abeg.",
    category: "dev",
    image: sebastineImage,
    music: {
      image: tokyoImage,
      name: "Tokyo Nights",
      artist: "Digital Farm Animals",
      url: "https://open.spotify.com/track/3TxKtkCNR1yQARsvHxvNnP?si=a5e62589435c423e",
    },
  },
  {
    key: "lukmon",
    name: "Lukmon Abdulsalam",
    role: "Web Developer",
    comment: "The daily drama and dragging is top notch",
    quote: "Anything you do, do 100% unless you are donating blood",
    category: "dev",
    image: lukmonImage,
    music: {
      image: johaImage,
      name: "Joha",
      artist: "Asake",
      url: "https://open.spotify.com/track/5UwxpuGHkwiojKDaPC5ZNu?si=b965ba812a0549c1",
    },
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
      image: johaImage,
      name: "Joha",
      artist: "Asake",
      url: "https://open.spotify.com/track/5UwxpuGHkwiojKDaPC5ZNu?si=b965ba812a0549c1",
    },
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
      image: caniImage,
      name: "Can I",
      artist: "Genevieve Stokes",
      url: "https://open.spotify.com/track/1H1ODNzLPam5SjmSOOChyU?si=9eaa3db4f4064b9b",
    },
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
  },
  {
    key: "naza",
    name: "Chinaza Icheke",
    role: "Product Designer",
    comment: "I enjoyed every moment of this project. These are amazing people.",
    quote: "When fear and doubt are a burden too heavy to bear. Remember this: You are not alone",
    category: "design",
    isLead: true,
    image: nazaImage,
    music: {
      image: dragonbornImage,
      name: "Dragonborn",
      artist: "Jeremy Soule",
      url: "https://open.spotify.com/track/2gaZJDgE71VL9PzzUUlpMg?si=e88d4e06c02345c0",
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
      image: fikeImage,
      name: "4x4",
      artist: "Dominic Fike",
      url: "https://open.spotify.com/track/3frC55hy41BhQK65FiJK7q?si=bacd6040a81d4b6d",
    },
  },
];
