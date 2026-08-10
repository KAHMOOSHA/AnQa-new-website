"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type AutoHideHeaderProps = {
  children: ReactNode;
  className: string;
  hiddenClassName: string;
  scrolledClassName: string;
};

const TOP_THRESHOLD = 20;
const MOVEMENT_THRESHOLD = 8;

export function AutoHideHeader({
  children,
  className,
  hiddenClassName,
  scrolledClassName,
}: AutoHideHeaderProps) {
  const previousScrollPosition = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    previousScrollPosition.current = window.scrollY;
    setHasScrolled(window.scrollY > TOP_THRESHOLD);

    function handleScroll() {
      const currentScrollPosition = window.scrollY;
      const scrollDifference =
        currentScrollPosition - previousScrollPosition.current;

      setHasScrolled(currentScrollPosition > TOP_THRESHOLD);

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
    hasScrolled ? scrolledClassName : "",
    isHidden ? hiddenClassName : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <header className={headerClassName}>{children}</header>;
}
