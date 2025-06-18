"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/utilities/ui";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between md:flex-row md:items-start">
        <div className="max-w-[80%]">
          <h2 className="font-medium text-neutral-900 dark:text-neutral-100">{title}</h2>
          <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
            {subtitle && (
              <p className="text-sm text-neutral-800 dark:text-neutral-200">{subtitle}</p>
            )}
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{period}</p>
          </div>
          {description && (
            <p className="text-sm text-neutral-500">
              {description}
            </p>
          )}
          {badges && (
            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-start justify-start rounded-full border border-neutral-200 bg-neutral-100 p-1 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 -mr-3 hover:z-10"
                  tabIndex={0}
                >
                  <span className="overflow-hidden whitespace-nowrap text-neutral-500 dark:text-neutral-200">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <img 
          src={logoUrl} 
          alt={altText} 
          width="100" 
          height="100" 
          className="hidden md:block" 
        />
      </div>
    </Link>
  );
};