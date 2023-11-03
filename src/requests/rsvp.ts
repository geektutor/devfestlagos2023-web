import axios from "axios";

export const addSessionsToRSVP = async ({
  sessionIds,
  token,
}: {
  sessionIds: string[];
  token: string;
}) => {
  await axios.post(
    "https://addmultipletousersessions-azqpniimiq-uc.a.run.app",
    {
      sessionIds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchRSVPS = async (token: string) => {
  const response = await axios("https://getusersessions-azqpniimiq-uc.a.run.app", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.data || [];
};

export const removeRSVP = async ({ sessionId, token }: { sessionId: string; token: string }) => {
  const response = await axios.post(
    "https://removefromusersessions-azqpniimiq-uc.a.run.app",
    {
      sessionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data?.data || [];
};
