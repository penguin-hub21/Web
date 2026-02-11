"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Typewriter = ({
  text,
  speed = 50,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-purple-500 ml-1 align-middle"
      />
    </span>
  );
};
