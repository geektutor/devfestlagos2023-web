interface Session {
  Venue: string;
  Schedule: string;
  Duration: string;
  Time: string;
  RoomSize: number;
  Session: string;
  SpeakerFacilitator: string;
}

export type Schedule = {
  duration: string;
  isbreakout: boolean;
  schedule: string;
  sessions: Session[];
  time: string;
  day: string;
  facilitator: string;
  order: number;
  venue?: string | null;
  Room?: string | null;
};
