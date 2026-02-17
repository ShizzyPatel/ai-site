"use client";

import { motion } from "framer-motion";
import React from "react";

type OnViewProps = {
  children: React.ReactNode;
  delay?: number;     // seconds
  duration?: number;  // seconds
  y?: number;         // px
  once?: boolean;
  margin?: string;    // rootMargin, e.g. "-10% 0px"
};

export default function OnView({
  children,
  delay = 0,
  duration = 0.45,
  y = 10,
  once = true,
  margin = "-10% 0px",
}: OnViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
