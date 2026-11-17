"use client";

import { useEffect, useState } from "react";
import { keyClick } from "@/lib/sound";

/** Reveals `lines` one character at a time once `start` is true. */
export function useLineTyper(lines: string[], start: boolean, speed = 14) {
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLine(lines.length);
      return;
    }
    if (line >= lines.length) return;
    const current = lines[line];
    if (char < current.length) {
      const id = setTimeout(() => {
        setChar((c) => Math.min(current.length, c + 2));
        if (current[char] && current[char] !== " ") keyClick();
      }, speed);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, 60);
    return () => clearTimeout(id);
  }, [start, line, char, lines, speed]);

  const done = line >= lines.length;
  const visible = lines.slice(0, line).concat(done ? [] : [lines[line].slice(0, char)]);
  return { visible, done, activeLine: done ? lines.length - 1 : line };
}
