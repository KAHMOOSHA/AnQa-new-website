"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type AutoHideHeaderProps = {
  children: ReactNode;
  className: string;
  hiddenClassName: string;
};

const TOP_THRESHOLD = 20;
const MOVEMENT_THRESHOLD = 8;

export function AutoHideHeader({
  children,
  className,
  hiddenClassName,
}: AutoHideHeaderProps) {
  const previousScrollPosition = useRef(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    previousScrollPosition.current = window.scrollY;

    function handleScroll() {
      const currentScrollPosition = window.scrollY;
      const scrollDifference =
        currentScrollPosition - previousScrollPosition.current;

      if (currentScrollPosition <= TOP_THRESHOLD) {
        setIsHidden(false);
      } else if (Math.abs(scrollDifference) >= MOVEMENT_THRESHOLD) {
        setIsHidden(scrollDifference > 0);
      }

      previousScrollPosition.current = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClassName = [
    className,
    isHidden ? hiddenClassName : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <header className={headerClassName}>{children}</header>;
}
