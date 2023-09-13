import { Speaker } from "@/types/Speaker";

export type TalkType = {
  title: string;
  description: string;
  category: "Design" | "Blockchain" | "Mobile Development";
  speakerId: number;
  date: string;
  speaker: Speaker;
};
