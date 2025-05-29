"use client"

import { useState } from "react";
import { Container } from "./container"
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
// TODO: use this
// import Link from "next-view-transitions";
import Link from "next/link";

export const Navbar = () => {
  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
    { title: "Blog", href: "/blog" },
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
        className="bg-white fixed inset-x-0 top-0 z-50 mx-auto flex max-w-4xl items-center justify-between rounded-full px-3 py-2 dark:bg-neutral-800 dark:text-white">
        <img
          className="h-10 w-10 rounded-full"
          src="/avatar.webp"
          height="100"
          width="100"
          alt="Avatar"
        />
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