import _speakers from "./speakers.json";
import _talks from "./talks.json";
import { Speaker } from "@/types/Speaker";
import { TalkType } from "@/types/Talk";

export const speakers: Array<Speaker> = _speakers.map((_speaker) => {
  const speaker = _speaker as Speaker;
  const talk = _talks.find((talk) => talk.speakerId === speaker.id);

  return {
    ...speaker,
    talk: talk as TalkType,
  };
});
export const talks: Array<TalkType> = _talks.map((_talk) => {
  const talk = _talk as TalkType;
  const speaker = _speakers.find((speaker) => speaker.id === talk.speakerId);

  return {
    ...talk,
    speaker: speaker as Speaker,
  };
});
