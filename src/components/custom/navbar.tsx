"use client"

import { useState } from "react";
import { Container } from "./container"
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
// TODO: use this
// import Link from "next-view-transitions";
import Link from "next/link";
import { IconBriefcase, IconDownload, IconFile, IconFolder, IconMail, IconUser } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { DockIcon } from "./dock";
import { ModeToggle } from "../ui/mode-toggle";
import { ThemeToggleButton } from "../ui/theme-toggle-button";

export const Navbar = () => {
  const navItems = [
    { title: "Projects", href: "/projects", icon: <IconFolder className="size-5 text-neutral-800 dark:text-neutral-100" /> },
    { title: "Experience", href: "/about", icon: <IconBriefcase className="size-5 text-neutral-800 dark:text-neutral-100" /> },
    { title: "Contact", href: "/contact", icon: <IconMail className="size-5 text-neutral-800 dark:text-neutral-100" /> },
    { title: "Blog", href: "/blogs", icon: <IconFile className="size-5 text-neutral-800 dark:text-neutral-100" /> },
  ];

  const [hovered, setHovered] = useState<number | null>(null)
  const { scrollY } = useScroll()

  const [scrolled, setScrolled] = useState<boolean>(false);

  const y = useTransform(scrollY, [0, 100], [0, 10])
  const width = useTransform(scrollY, [0, 100], ["58%", "52%"])
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8])

  const filter = useMotionTemplate`blur(${useTransform(scrollY, [0, 100], [0, 10])}px)`


  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });
  return (
    <Container>
      <motion.nav
        style={{
          boxShadow: scrolled ? "var(--shadow-custom)" : "none",
          width,
          y,
          // opacity,
          // filter,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        className="bg-white/50 backdrop-blur-sm fixed inset-x-0 top-0 z-50 mx-auto flex max-w-4xl items-center justify-between rounded-full px-3 py-2 dark:bg-neutral-800 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="flex aspect-square cursor-pointer items-center justify-center rounded-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <ModeToggle /> */}
                  <ThemeToggleButton showLabel={false} variant="circle" start="top-left" />
                </TooltipTrigger>
                <TooltipContent>
                  {/* TODO: https://21st.dev/designali-in/theme/default */}
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex aspect-square cursor-pointer items-center justify-center rounded-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="/resume.pdf"
                    download="resume.pdf"
                    tabIndex={-1}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="outline-none shadow-xs border-[1px] rounded-md size-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                    >
                      <IconDownload className="size-4 text-neutral-500 dark:text-neutral-400" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

        </div>
        <div className="flex items-center">
          {navItems.map((item, idx) => (
            <Link
              className="relative px-2 py-1 text-sm"
              href={item.href}
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="absolute inset-0 h-full w-full rounded-md bg-neutral-100 dark:bg-neutral-800"
                />
              )}
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="relative z-10">
                      {item.icon}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
              <span className="relative z-10">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </Container>
  )
}