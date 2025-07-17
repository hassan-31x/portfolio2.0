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
  end: string | null;
  description: string;
  skills: string[];
}

export const workExperience: WorkExperience[] = [
  {
    company: "Useryze",
    href: "https://useryze.com", // Placeholder, update if needed
    badges: ["AI", "SaaS"],
    location: "Remote",
    title: "Full Stack Engineer",
    logoUrl: "/images/useryze.jpeg", // Placeholder, update with actual logo path
    start: "Dec 2024",
    end: null,
    description:
      "Created an AI-powered SaaS content tool integrating PineconeDB, OpenAI API, and Deepseek models. Utilized scraped posts from social media channels for context using vector embeddings to create a complete Marketing Funnel for automated content writing. Developed the organization's landing page as CRO for A/B testing and deployed to VPS & AWS Amplify. Powered all website content through Payload CMS for dynamic content management.",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "OpenAI",
      "Payload CMS",
      "AWS Amplify",
      "A/B Testing"
    ],
  },
  {
    company: "GT Solutions USA",
    href: "https://gtsolutionsusa.com", // Placeholder, update if needed
    badges: ["CRM", "Mobile Apps"],
    location: "Remote",
    title: "Full Stack Engineer",
    logoUrl: "/images/gtsolutions.webp", // Placeholder, update with actual logo path
    start: "May 2024",
    end: "June 2025",
    description:
      "Developed full stack web applications and mobile apps as in-house CRMs for US-based daycares and other businesses, targeting a potential 1000+ user base. Built admin portals with role-based employee management and integrated payment modules. Coded an Admin Panel for Aga Khan Hospital's food survey project, adding functionalities such as location access and offline data management to the mobile app.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "React Native",
    ],
  },
  // {
  //   company: "Fiverr",
  //   href: "https://fiverr.com",
  //   badges: ["Freelance", "Ecommerce"],
  //   location: "Remote",
  //   title: "Web Developer (Freelancing)",
  //   logoUrl: "/fiverr.png", // Placeholder, update with actual logo path
  //   start: "October 2023",
  //   end: "August 2024",
  //   description:
  //     "Completed 14+ freelance projects, including multiple ecommerce and full stack applications from scratch using Next.js, Typescript, Tailwind, Next Auth, Sanity, and more. Notable projects include OkJobs, Chairlaxed, Bordsteinschwalbe, RCA Capital, Legal Crystal, and Dezgnkraft.",
  //   skills: [
  //     "Next.js",
  //     "Typescript",
  //     "Tailwind CSS",
  //     "Next Auth",
  //     "Sanity",
  //     "Ecommerce",
  //     "Full Stack Development"
  //   ],
  // },
  {
    company: "Xeverse.io",
    href: "https://xeverse.io",
    badges: ["AI", "CRM"],
    location: "Remote",
    title: "Junior Full Stack Developer",
    logoUrl: "/images/xeverse.jpeg", // Placeholder, update with actual logo path
    start: "June 2023",
    end: "November 2023",
    description:
      "Worked on international client projects, including the frontend of an AI chat application with multi-format responses, authentication via Next Auth, and chat history storage. Implemented features for creating charts, generating business reports, and tabular data for visualization. Developed a full stack CRM using Next.js and Typescript to manage data for 10k+ users and employees, integrating Cypress for continuous testing.",
    skills: [
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "MySQL",
      "Firebase",
      "Cypress",
    ],
  },
  // {
  //   company: "Alpha College",
  //   href: "https://alphacollege.edu.pk", // Placeholder, update if needed
  //   badges: ["Leadership", "Olympiad"],
  //   location: "Onsite",
  //   title: "Co-Head IT Department",
  //   logoUrl: "/alphacollege.png", // Placeholder, update with actual logo path
  //   start: "October 2022",
  //   end: "March 2023",
  //   description:
  //     "Built a full stack web app with a custom multi-step registration form, user portal for teams, online payment verification, and admin panel for an inter-school Science Olympiad with 100+ teams. Oversaw an automatic attendance system for 500+ participants using barcodes for verification during the 3-day competition. Utilized Vanilla JavaScript, HTML, and CSS.",
  //   skills: [
  //     "JavaScript",
  //     "HTML",
  //     "CSS",
  //     "Full Stack Development",
  //     "Payment Integration",
  //     "Barcode Systems",
  //     "Event Management"
  //   ],
  // },
]