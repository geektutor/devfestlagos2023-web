import { Speaker } from "@/types/Speaker";

export type TalkType = {
  title: string;
  description: string;
  category: "Design" | "Blockchain" | "Mobile Development" | "Product" | "Design";
  speakerId: number;
  date: string;
  speaker: Speaker;
  seatCount?: number;
};
