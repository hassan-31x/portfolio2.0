import React from "react";
import { motion } from "framer-motion";
import cn from "classnames";

type Props = {
  technology: string;
  className?: string;
};

const getLogoForTechnology = (tech: string) => {
  // You can expand this mapping as needed
  const logos: Record<string, React.ReactNode> = {
    "React": (
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
        <ellipse rx="14" ry="5.5" cx="16" cy="16" fill="none" stroke="#61DAFB" strokeWidth="2"/>
        <ellipse rx="14" ry="5.5" cx="16" cy="16" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 16 16)"/>
        <ellipse rx="14" ry="5.5" cx="16" cy="16" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 16 16)"/>
      </svg>
    ),
    "Node.js": (
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
        <path d="M16 2.5L29 9.5V22.5L16 29.5L3 22.5V9.5L16 2.5Z" stroke="#3C873A" strokeWidth="2" fill="none"/>
        <text x="8" y="21" fontSize="8" fill="#3C873A" fontFamily="monospace">Node</text>
      </svg>
    ),
    "MongoDB": (
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C16 4 12 12 16 28C20 12 16 4 16 4Z" fill="#47A248"/>
        <ellipse cx="16" cy="16" rx="2" ry="4" fill="#A6E22E"/>
      </svg>
    ),
  };
  return logos[tech] || null;
};

const StackItem = ({ technology, className }: Props) => {
  return (
    <motion.div
      layout
      whileHover="animate"
      whileTap="animate"
      initial="initial"
      className={cn(
        "flex items-start justify-start rounded-full border border-neutral-200 bg-neutral-100 p-1 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800",
        className,
      )}
    >
      <motion.span
        variants={{
          animate: { paddingRight: 2 },
        }}
        transition={{
          type: "spring",
        }}
      >
        {getLogoForTechnology(technology)}
      </motion.span>
      <motion.span
        variants={{
          initial: { width: 0 },
          animate: { width: "auto" },
          exit: { width: 0 },
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.5,
        }}
        className="overflow-hidden whitespace-nowrap text-neutral-500 dark:text-neutral-200"
      >
        {technology}
      </motion.span>
    </motion.div>
  );
};

export default StackItem;
