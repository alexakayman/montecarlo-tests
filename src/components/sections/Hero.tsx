"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

function Hero() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-svw"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center w-full mb-2">
          Protect your legacy
        </div>
        <div className="">
          <p className="font-extralight text-base md:text-4xl  dark:text-neutral-200 text-center max-w-4xl">
            A philanthropic planning tool for family offices and personal
            finances. Monte Carlo simulation to optimize your giving.
          </p>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export { Hero };
