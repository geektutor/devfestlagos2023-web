import _speakers from "./speakers.json";
import { Speaker } from "@/types/Speaker";

export const speakers: Array<Speaker> = _speakers.map((speaker) => speaker as Speaker);
