import { Speaker } from "@/types/Speaker";
import { Session } from "@/types/Session";

export const getSpeakerSession = ({
  speaker,
  sessions,
}: {
  speaker: Speaker;
  sessions: Session[];
}) => {
  return sessions.find((session) => session.sessionId === speaker.currentSessionId);
};
