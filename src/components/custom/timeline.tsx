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
          title: "Reached $20K MRR with my VSCode fork",
          description: "Reached the revenue milestone of $20K MRR with my VSCode fork.",
        },
        {
          title: "Launched AI-powered code completion",
          description: "Integrated advanced AI models for intelligent code suggestions and completions.",
        },
      ],
    },
    {
      title: "2024",
      content: [
        {
          title: "Expanded to enterprise customers",
          description: "Secured partnerships with Fortune 500 companies for custom VSCode solutions.",
        },
        {
          title: "Released plugin marketplace",
          description: "Created a marketplace for community-developed extensions and themes.",
        },
        {
          title: "Achieved 100K+ active users",
          description: "Reached significant user adoption milestone across multiple platforms.",
        },
      ],
    },
    {
      title: "2023",
      content: [
        {
          title: "Initial VSCode fork launch",
          description: "Released first version with enhanced performance and custom features.",
        },
        {
          title: "First paying customers",
          description: "Converted early adopters to paid subscriptions.",
        },
      ],
    },
    {
      title: "2022",
      content: [
        {
          title: "Started development",
          description: "Began working on the VSCode fork project.",
        },
        {
          title: "Built core team",
          description: "Assembled initial team of developers and designers.",
        },
        {
          title: "Secured seed funding",
          description: "Raised initial investment to support development.",
        },
      ],
    },
    {
      title: "2021",
      content: [
        {
          title: "Project conception",
          description: "Identified market opportunity for enhanced VSCode experience.",
        },
        {
          title: "Market research",
          description: "Conducted extensive user interviews and competitive analysis.",
        },
      ],
    },
  ];

  return (
  <div ref={ref} className="py-10">
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

