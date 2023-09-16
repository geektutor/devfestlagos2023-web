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
  },
  {
    key: "joel",
    name: "Joel Adewole",
    role: "Content Writer/QA",
    comment: "I love the team spirit and commitment",
    quote: "Don't be too sweet, or people will eat you",
    category: "content",
    image: joelImage,
  },
  {
    key: "sebastine",
    name: "Sebastaine Odeh",
    role: "Mobile Developer",
    comment: "Lere is a sweet babe but my babe's sweeter🙏🏽🙏🏽",
    quote: "God Abeg.",
    category: "dev",
    image: sebastineImage,
  },
  {
    key: "lukmon",
    name: "Lukmon Abdulsalam",
    role: "Web Developer",
    comment: "The daily drama and dragging is top notch",
    quote: "Anything you do, do 100% unless you are donating blood",
    category: "dev",
    image: lukmonImage,
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
  },
  {
    key: "lere",
    name: "Omolere Asama",
    role: "Content Manager / Web Developer",
    comment:
      "First of, as you have heard, I'm a sweet babe😌🤚🏾I always look forward to planning DevFest, it's always a lovely experience working with the team. I also owe Chinaza one Benz for being the best team player ❤️",
    quote: "Let everything happen to you—beauty and terror. Keep going, nothing is final.",
    category: "dev,content",
    image: lereImage,
  },
  {
    key: "tobi",
    name: "Oluwatobi Peter Taiwo",
    role: "Frontend Developer",
    comment: "Hardworking and fun team 👉🏽👈🏽",
    quote: "See opportunities in chaos",
    category: "dev",
    image: tobiImage,
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
  },
  {
    key: "daniel",
    name: "Aghahowa Daniel",
    role: "UX Designer",
    comment: "I’m already there DevFest 2024",
    quote: "Make good great",
    category: "design",
    image: danielImage,
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
  },
];
