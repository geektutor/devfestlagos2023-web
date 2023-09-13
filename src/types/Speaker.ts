export type Speaker = {
  id: number;
  image: string;
  name: string;
  role: string;
  company: string;
  backgroundColor: string;
  day: 1 | 2;
  links: {
    twitter?: string | undefined;
    instagram?: string | undefined;
    website?: string | undefined;
  };
};
