"use client";
import { AnimationProps, motion } from "framer-motion";
import React from "react";

export const MotionDiv = (
  props: AnimationProps & { children?: React.ReactNode },
) => {
  return <motion.div {...props} />;
};

