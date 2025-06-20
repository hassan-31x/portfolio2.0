// This file contains work experience data for the portfolio
// Each WorkExperience object should include:
// - company: Company name
// - logoUrl: Path to company logo image
// - href: Company website URL
// - badges: Array of technology/skill badges
// - location: Work location (Remote, City, etc.)
// - title: Job title/position
// - start: Start date in "Month Year" format
// - end: End date in "Month Year" format
// - description: Brief description of role and achievements

export type WorkExperience = {
  company: string;
  logoUrl: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  start: string;
  end: string;
  description: string;
  skills: string[];
}

export const workExperience: WorkExperience[] = [
  {
    company: "Atomic Finance",
    href: "https://atomic.finance",
    badges: [],
    location: "Remote",
    title: "Bitcoin Protocol Engineer",
    logoUrl: "/atomic.png",
    start: "May 2021",
    end: "Oct 2022",
    description:
      "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK.",
    skills: ["Typescript", "Kubernetes", "Docker", "Bitcoin", "Go"],
  },
  {
    company: "Shopify",
    badges: [],
    href: "https://shopify.com",
    location: "Remote",
    title: "Software Engineer",
    logoUrl: "/shopify.svg",
    start: "January 2021",
    end: "April 2021",
    description:
      "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources.",
    skills: ["Go", "Kubernetes", "MySQL", "ProxySQL"],
  },
  {
    company: "Nvidia",
    href: "https://nvidia.com/",
    badges: ["Best Intern"],
    location: "Santa Clara, CA",
    title: "Software Engineer",
    logoUrl: "/nvidia.png",
    start: "January 2020",
    end: "April 2020",
    description:
      "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    skills: ["React", "Redux", "Typescript", "Python"],
  },
  {
    company: "Splunk",
    href: "https://splunk.com",
    badges: [],
    location: "San Jose, CA",
    title: "Software Engineer",
    logoUrl: "/splunk.svg",
    start: "January 2019",
    end: "April 2019",
    description:
      "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product.",
    skills: ["Swift", "Django", "Python", "C++", "gRPC"],
  },
]