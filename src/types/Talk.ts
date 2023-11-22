import { SpeakerType } from "@/types/SpeakerType";

export type TalkType = {
  title: string;
  description: string;
  category: "Design" | "Blockchain" | "Mobile Development" | "Product" | "Design";
  speakerId: number;
  date: string;
  speaker: SpeakerType;
  seatCount?: number;
  timeLeft?: string;
  hall?: string;
};
