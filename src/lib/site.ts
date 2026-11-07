export const site = {
  name: "Parmeshwar Yadav",
  role: "Business Analyst & builder",
  description:
    "Analyst by profession, tech enthusiast and tinkerer by obsession. Building web tools to automate my own life (and yours), while trying not to pull a muscle playing football.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://parmeshwaryadav.vercel.app",
  email: "yadavparmeshwar342@gmail.com",
  links: {
    github: "https://github.com/parmeshwaryadav",
    linkedin: "https://linkedin.com/in/parmeshwaryadav",
    goodreads: "https://www.goodreads.com/user/show/202055364-parmeshwar",
  },
} as const;
