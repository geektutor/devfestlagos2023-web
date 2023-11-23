import axios from "axios";
import { Session } from "@/types/Session";
import { Category } from "@/types/Category";
import { Speaker } from "@/types/Speaker";
import { Schedule } from "@/types/Schedule";

export const fetchSessions = async () => {
  try {
    const response = await axios("https://fetchsessions-azqpniimiq-uc.a.run.app");

    if (!response.data?.data) {
      return [];
    }

    const sessions = response.data.data as Session[];

    return sessions.map((s) => {
      const sessionDate = s.sessionDate.split("T")[0];

      const day = new Date(s.sessionDate).getDate() === 24 ? 1 : 2;

      return {
        ...s,
        day,
        sessionDate,
      };
    }) as Session[];
  } catch (e) {}

  return [];
};

export const fetchCategories = async () => {
  try {
    const response = await axios("https://fetchcategories-azqpniimiq-uc.a.run.app");

    if (!response.data?.data) {
      return [];
    }

    return response.data.data as Category[];
  } catch (e) {}

  return [];
};

export const fetchSpeakers = async () => {
  try {
    const response = await axios("https://fetchspeakers-azqpniimiq-uc.a.run.app");

    if (!response.data?.data) {
      return [];
    }

    const speakers = response.data.data as Speaker[];
    return speakers.sort((speaker) => speaker.order - speaker.order);
  } catch (e) {}

  return [];
};

function processAgenda(agenda: Schedule[]): Schedule[] {
  const processedAgenda: Schedule[] = [];
  let lastEndTime: Date | null = null;

  agenda.forEach((item) => {
    // Calculate time if missing
    if (!item.time && lastEndTime && item.duration) {
      const duration = parseInt(item.duration, 10);
      const endTime = new Date(lastEndTime.getTime() + duration * 60000);
      item.time = formatTime(lastEndTime) + " - " + formatTime(endTime);
      lastEndTime = endTime;
    } else if (item.time) {
      const times = item.time.split("-").map((t) => parseTime(t.trim()));
      lastEndTime = new Date(times[1]);
    }

    if (!item.isbreakout) {
      const time = item.time.includes("end") ? item.time.replaceAll("end", "End") : item.time;
      // Add non-breakout item
      processedAgenda.push({
        ...item,
        time,
      });
    } else {
      // Flatten breakout sessions
      item.sessions.forEach((session) => {
        const breakoutItem: Schedule = {
          ...item,
          ...session,
          schedule: session.Schedule || item.schedule,
          venue: session.Venue,
          sessions: [], // Empty the sessions array for breakout items
        };
        processedAgenda.push(breakoutItem);
      });
    }
  });

  return processedAgenda.map((agenda) => ({
    ...agenda,
    venue: agenda.venue || null,
  }));
}

function parseTime(timeString: string): Date {
  const [time, modifier = ""] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (modifier.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  minutes += 0;

  return new Date(new Date().setHours(hours, minutes, 0, 0));
}

function formatTime(date: Date): string {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

export const fetchAgenda = async () => {
  try {
    const response = await axios("https://fetchagendas-azqpniimiq-uc.a.run.app");

    if (!response.data?.data) {
      return [];
    }

    const agenda = response.data.data as Schedule[];
    const agendaSorted = agenda.sort((speaker, speakerB) => speaker.order - speakerB.order);

    const day1 = processAgenda(agendaSorted.filter((item) => new Date(item.day).getDate() === 24));
    const day2 = processAgenda(agendaSorted.filter((item) => new Date(item.day).getDate() === 25));

    return [day1, day2];
  } catch (e) {
    console.log("wtf ", e);
  }

  return [];
};
