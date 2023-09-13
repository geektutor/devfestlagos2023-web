import SpeakerCard from "@/components/speaker/speaker";

export default {
  tags: ["autodocs"],
  title: "Components/speaker-card",
  component: SpeakerCard,
};

export const Web = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    fullname: "Omo Ologo 10GB",
    role: "Chief Cook",
    company: "Google",
    variant: "web",
  },
};

export const Mobile = {
  args: {
    ...Web.args,
    variant: "mobile",
  },
};
