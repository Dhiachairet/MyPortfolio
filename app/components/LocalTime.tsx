"use client";

import { useEffect, useState } from "react";

// Live clock for a given timezone, rendered after mount to avoid hydration drift
export default function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
