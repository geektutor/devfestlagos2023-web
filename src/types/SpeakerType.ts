import { TalkType } from "@/types/Talk";
import { StaticImageData } from "next/image";

export type SpeakerType = {
  id: number;
  image: string | StaticImageData;
  name: string;
  role: string;
  company: string;
  backgroundColor: string;
  day: 1 | 2;
  links: {
    twitter?: string | undefined;
    instagram?: string | undefined;
    website?: string | undefined;
  };
  talk?: TalkType;
};
