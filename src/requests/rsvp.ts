import axios from "axios";

export const addSessionsToRSVP = async (sessionIds: string[]) => {
  await axios.post("https://addmultipletousersessions-azqpniimiq-uc.a.run.app", {
    sessionIds,
  });
};

export const fetchRSVPS = async (session: string) => {
  const response = await axios("https://getusersessions-azqpniimiq-uc.a.run.app", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  return response.data;
};
