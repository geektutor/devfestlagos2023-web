export type Session = {
  owner: string;
  level: string;
  scheduledDuration: string;
  description: string;
  hall: string;
  sessionId: string;
  title: string;
  category: string;
  scheduledAt: string;
  sessionFormat: string;
  ownerEmail: string;
  speakerImage: string;
  tagLine: string;
  availableSeats: number;
  slot: number;
  sessionDate: string;
  day: 1 | 2;
};
