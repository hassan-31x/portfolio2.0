"use client"

import React, { useRef } from "react";
import { cn } from "@/utilities/ui";
import { useInView, motion } from "motion/react";
import { IconCircleCheckFilled } from "@tabler/icons-react";

type Data = {
  title: string;
  content: {
    title: string;
    description: string | React.ReactNode;
  }[];
}[];

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const data: Data = [
    {
      title: "2025",
      content: [
        {
          title: "Got hired at a US Startup as a Full Stack Engineer",
          description: "Currently working as a fullstack engineer for a US startup creating internal products",
        },
      ],
    },
    {
      title: "2024",
      content: [
        {
          title: "Got hired as a Full Stack Engineer",
          description: "Worked as a junior fullstack engineer for 1 year for a service based company",
        },
        {
          title: "Completed 15+ projects as a freelancer",
          description: "Worked on a wide range of client projects including ecommerce stores, landing pages, and more.",
        },
      ],
    },
    {
      title: "2023",
      content: [
        {
          title: "Left the job to persue freelance work",
          description: "Started working as a freelancer for ecommerce stores",
        },
        {
          title: "Got my first internship",
          description: "Worked as a fullstack intern for 3 months converting into a junior role",
        },
      ],
    },
    {
      title: "2022",
      content: [
        {
          title: "Assigned to create college website",
          description: "Created a website for college's olympiad with 500+ registrations",
        },
        {
          title: "Started learning web development ",
          description: "Began my journey into programming with JavaScript, HTML, and CSS.",
        },
      ],
    },
  ];

  return (
    <div ref={ref} className="shadow-[0px_1px_4px_0px_var(--color-neutral-100)_inset,0px_-1px_4px_0px_var(--color-neutral-100)_inset] border-y border-neutral-100 my-6 px-4 py-4">
      {data.map((year, index) => (
        <div key={year.title} className="mb-4">
          <motion.h2
            initial={{
              filter: "blur(10px)",
              opacity: 0,
            }}
            animate={{
              filter: isInView ? "blur(0px)" : "blur(10px)",
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.1 * index,
            }}
            className="font-bold text-black w-fit rounded-md px-2 py-0.5 mb-2"
            style={{
              boxShadow: "var(--shadow-custom)",
            }}
          >
            {year.title}
          </motion.h2>
          <div className="flex flex-col gap-4">
            {year.content.map((item, idx) => (
              <div key={item.title} className="pl-4">
                <Step isInView={isInView} idx={idx}>
                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.2 * idx,
                    }}
                    className="text-neutral-600"
                  >{item.title}</motion.h3>
                </Step>
                {item.description && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.3 * idx,
                    }}
                    className="text-neutral-400 pt-1 pl-6 text-sm"
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

const Step = ({
  className,
  children,
  isInView,
  idx,
}: {
  className?: string;
  children: React.ReactNode;
  isInView: boolean;
  idx: number;
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: -10,
    }}
    animate={{
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : -10,
    }}
    transition={{
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.2 * idx,
    }}
    className={cn("flex items-start gap-2", className)}
  >
    <IconCircleCheckFilled className="mt-[3px] h-4 w-4 text-neutral-500" />
    {children}
  </motion.div>
);

