"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration of animation in milliseconds
  threshold?: number; // Visibility threshold before triggering (0 to 1)
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 1000,
  threshold = 0.1,
}: ScrollRevealProps) {
  // Keep server-rendered content visible by default.  Hiding the wrapper
  // before the observer has reported its first entry makes the whole page
  // blank when client JavaScript is delayed, disabled, or interrupted.
  const [hasEntered, setHasEntered] = useState(true);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Falls back gracefully if IntersectionObserver is not supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const currentElement = elementRef.current;
    if (!currentElement) return;

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;

          setHasEntered(entry.isIntersecting);
          if (entry.isIntersecting) {
            // Disconnect after entering once to lock in the visible state
            // (premium, clean look).
            observer.disconnect();
          }
        },
        {
          threshold,
          // Trigger slightly before the component enters to ensure a smooth transition
          rootMargin: "0px 0px -40px 0px",
        },
      );

      observer.observe(currentElement);
    } catch {
      // A partially supported or broken observer must never hide content.
      return;
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all ease-[cubic-bezier(0.16,1,0.3,1)]`}
      style={{
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translateY(0)" : "translateY(32px)",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
