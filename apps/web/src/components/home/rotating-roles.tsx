"use client";

import { useEffect, useRef, useState } from "react";

const roles = [
  "Senior Front-End Engineer",
  "UX Engineer",
  "Design Systems Architect",
  "Accessibility Advocate",
  "Performance Engineer"
];

export function RotatingRoles() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startRoleRotation = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || roles.length <= 1) {
      return;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setActiveRoleIndex((currentIndex) => (currentIndex + 1) % roles.length);
    }, 3500);
  };

  useEffect(() => {
    startRoleRotation();

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const activateRole = (index: number) => {
    setActiveRoleIndex(index);
    startRoleRotation();
  };

  return (
    <div className="role-list" aria-label="Professional roles">
      {roles.map((role, index) => {
        const isActive = index === activeRoleIndex;

        return (
          <button
            className={`role-item${isActive ? " is-active" : ""}`}
            type="button"
            data-role={index}
            aria-pressed={isActive}
            key={role}
            onClick={() => activateRole(index)}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
}
