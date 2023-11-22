import _speakers from "./speakers.json";
import _talks from "./talks.json";
import { SpeakerType } from "@/types/SpeakerType";
import { TalkType } from "@/types/Talk";

export const speakers: Array<SpeakerType> = _speakers.map((_speaker) => {
  const speaker = _speaker as SpeakerType;
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
    speaker: speaker as SpeakerType,
  };
});
