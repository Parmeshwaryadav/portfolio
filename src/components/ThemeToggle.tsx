"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonStar, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="hover:bg-transparent"
    >
      {theme === "dark" ? (
        <SunIcon className="size-4 text-orange-300" />
      ) : (
        <MoonStar className="size-4 text-indigo-500" />
      )}
    </Button>
  );
}
