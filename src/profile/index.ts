import { avatar } from "./avatar";

type Profile = {
  name: string;
  twitter: string;
  github: string;
  website: string;
  description: string;
  // base64 encoded image
  avatar: string;
};

export const profile: Profile = {
  name: "syumai",
  twitter: "__syumai",
  github: "syumai",
  website: "syum.ai",
  description: "Web Application Developer",
  avatar,
};
