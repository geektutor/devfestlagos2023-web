import _speakers from "./speakers.json";
import _talks from "./talks.json";
import { Speaker } from "@/types/Speaker";
import { Talk } from "@/types/Talk";

export const speakers: Array<Speaker> = _speakers.map((_speaker) => {
  const speaker = _speaker as Speaker;
  const talk = _talks.find((talk) => talk.speakerId === speaker.id);

  return {
    ...speaker,
    talk: talk as Talk,
  };
});
export const talks: Array<Talk> = _talks.map((_talk) => {
  const talk = _talk as Talk;
  const speaker = _speakers.find((speaker) => speaker.id === talk.speakerId);

  return {
    ...talk,
    speaker: speaker as Speaker,
  };
});
