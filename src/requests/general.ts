import axios from "axios";
import { Session } from "@/types/Session";
import { Category } from "@/types/Category";

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
