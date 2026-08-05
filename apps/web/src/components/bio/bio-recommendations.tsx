"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import { recommendations } from "@/data/recommendations";

const SCROLL_TOLERANCE = 2;

/**
 * Measurements returned from getRailMeasurements
 */
interface RailMeasurements {
  cardPositions: number[];
  stepSize: number;
  maxScrollLeft: number;
  maxAlignableIndex: number;
  lastGroupedIndex: number;
  isAtStart: boolean;
  isAtEnd: boolean;
}

/**
 * Centralized measurement function that reads all navigation values from DOM.
 * Returns card positions, responsive step size from CSS, scroll boundaries,
 * and current navigation state.
 */
function getRailMeasurements(
  rail: HTMLElement,
  track: HTMLElement
): RailMeasurements {
  const items = Array.from(track.children) as HTMLElement[];
  const firstItemOffset = items[0]?.offsetLeft ?? 0;
  const cardPositions = items.map((item) => item.offsetLeft - firstItemOffset);

  // Read responsive step size from CSS custom property
  const stepSize = parseInt(
    getComputedStyle(track).getPropertyValue("--recommendation-step") || "3",
    10
  );

  const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);

  // Last card whose left position can physically align with rail's left edge
  // without exceeding maxScrollLeft
  const maxAlignableIndex = cardPositions.reduce(
    (lastIndex, position, index) =>
      position <= maxScrollLeft + SCROLL_TOLERANCE
        ? index
        : lastIndex,
    0
  );

  // Last index reachable through normal grouped navigation
  const lastGroupedIndex = Math.floor(maxAlignableIndex / stepSize) * stepSize;

  const isAtStart = rail.scrollLeft <= SCROLL_TOLERANCE;
  const isAtEnd = rail.scrollLeft >= maxScrollLeft - SCROLL_TOLERANCE;

  return {
    cardPositions,
    stepSize,
    maxScrollLeft,
    maxAlignableIndex,
    lastGroupedIndex,
    isAtStart,
    isAtEnd,
  };
}

/**
 * Find the nearest card index to the current scroll position
 */
function findNearestCardIndex(
  scrollLeft: number,
  cardPositions: number[]
): number {
  if (cardPositions.length === 0) return 0;

  return cardPositions.reduce((nearest, position, index) => {
    const currentDistance = Math.abs(position - scrollLeft);
    const nearestDistance = Math.abs(cardPositions[nearest] - scrollLeft);
    return currentDistance < nearestDistance ? index : nearest;
  }, 0);
}

/**
 * Check if user has reduced motion preference
 */
function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BioRecommendations() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const isScrollingRef = useRef(false);
  const isEndAlignedRef = useRef(false);
  const handleNavigationRef = useRef<((direction: "previous" | "next") => void) | null>(null);

  // Minimal state for button rendering
  const [buttonState, setButtonState] = useState({
    isAtStart: true,
    isAtEnd: false,
  });

  // Initialize scroll position
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollLeft = 0;
    currentIndexRef.current = 0;
    isEndAlignedRef.current = false;
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    /**
     * Scroll to a specific card index (grouped navigation).
     * Aligns the card to the left edge of the rail.
     */
    const scrollToCard = (index: number, behavior: ScrollBehavior) => {
      const measurements = getRailMeasurements(rail, track);
      const targetIndex = Math.max(0, Math.min(index, measurements.lastGroupedIndex));
      const targetPosition = measurements.cardPositions[targetIndex] ?? 0;

      rail.scrollTo({
        left: Math.min(targetPosition, measurements.maxScrollLeft),
        behavior: prefersReducedMotion() ? "auto" : behavior,
      });

      currentIndexRef.current = targetIndex;
      isEndAlignedRef.current = false;

      if (behavior === "smooth") {
        isScrollingRef.current = true;
      }
    };

    /**
     * Scroll to the true end (right-aligned final card).
     * Uses maxScrollLeft rather than a card position.
     */
    const scrollToEnd = (behavior: ScrollBehavior) => {
      const measurements = getRailMeasurements(rail, track);

      rail.scrollTo({
        left: measurements.maxScrollLeft,
        behavior: prefersReducedMotion() ? "auto" : behavior,
      });

      isEndAlignedRef.current = true;

      if (behavior === "smooth") {
        isScrollingRef.current = true;
      }
    };

    /**
     * Handle grouped navigation (Previous/Next buttons).
     * Next: Advances by stepSize until lastGroupedIndex, then scrolls to true end.
     * Previous: Returns from true end to lastGroupedIndex, then steps backward.
     */
    const handleNavigation = (direction: "previous" | "next") => {
      // Guard: prevent navigation during smooth scroll
      if (isScrollingRef.current) return;

      const measurements = getRailMeasurements(rail, track);
      const currentIndex = currentIndexRef.current;

      if (direction === "next") {
        // At true end: do nothing
        if (measurements.isAtEnd) {
          return;
        }

        // Can advance within grouped positions
        if (currentIndex < measurements.lastGroupedIndex) {
          const targetIndex = Math.min(
            currentIndex + measurements.stepSize,
            measurements.lastGroupedIndex
          );
          scrollToCard(targetIndex, "smooth");
        } else {
          // At or past last grouped position: scroll to true end
          scrollToEnd("smooth");
        }
      } else {
        // Previous navigation
        // If currently at true end, return to last grouped position
        if (isEndAlignedRef.current) {
          scrollToCard(measurements.lastGroupedIndex, "smooth");
        } else if (currentIndex > 0) {
          // Normal previous navigation
          const targetIndex = Math.max(0, currentIndex - measurements.stepSize);
          scrollToCard(targetIndex, "smooth");
        }
        // At index 0: do nothing
      }
    };

    /**
     * Update button states and sync current index after scroll settles.
     * Clears the programmatic scrolling flag.
     */
    const updateButtonState = () => {
      const measurements = getRailMeasurements(rail, track);
      const nearestIndex = findNearestCardIndex(rail.scrollLeft, measurements.cardPositions);

      // Sync current index and end-aligned state to actual scroll position
      if (measurements.isAtEnd) {
        currentIndexRef.current = measurements.lastGroupedIndex;
        isEndAlignedRef.current = true;
      } else {
        currentIndexRef.current = Math.min(nearestIndex, measurements.lastGroupedIndex);
        isEndAlignedRef.current = false;
      }

      setButtonState({
        isAtStart: measurements.isAtStart,
        isAtEnd: measurements.isAtEnd,
      });

      // Clear programmatic scrolling flag
      isScrollingRef.current = false;
    };

    /**
     * Debounced scroll handler
     */
    const handleScroll = () => {
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = window.setTimeout(updateButtonState, 120);
    };

    /**
     * Handle resize: realign to current position without smooth scrolling.
     * If at true end, realign to new true end. Otherwise clamp to lastGroupedIndex.
     */
    const handleResize = () => {
      const measurements = getRailMeasurements(rail, track);

      // If at true end, realign to new true end
      if (isEndAlignedRef.current || measurements.isAtEnd) {
        scrollToEnd("auto");
      } else {
        // Clamp current index to last grouped position
        const clampedIndex = Math.min(currentIndexRef.current, measurements.lastGroupedIndex);
        scrollToCard(clampedIndex, "auto");
      }
    };

    // Setup ResizeObserver and scroll listener
    const resizeObserver = new ResizeObserver(handleResize);

    // Expose navigation handler for button clicks
    handleNavigationRef.current = handleNavigation;

    // Initial button state
    updateButtonState();

    resizeObserver.observe(rail);
    rail.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
      resizeObserver.disconnect();
      rail.removeEventListener("scroll", handleScroll);
    };
  }, []); // Stable: all handlers use refs, no external dependencies

  const handleButtonClick = (direction: "previous" | "next") => {
    handleNavigationRef.current?.(direction);
  };

  return (
    <section
      className="bio-recommendations"
      id="recommendations"
      aria-labelledby="bio-recommendations-heading"
    >
      <header className="bio-recommendations-header">
        <div className="bio-recommendations-title">
          <div className="bio-recommendations-mark" aria-hidden="true">
            <Send />
          </div>

          <div>
            <p className="eyebrow">PROFESSIONAL RECOMMENDATIONS</p>

            <h2 id="bio-recommendations-heading">
              Trusted by the people I&apos;ve worked with.
            </h2>

            <p>
              Feedback from engineering leaders, product managers, clients, and
              colleagues across enterprise teams, agencies, and digital products.
            </p>
          </div>
        </div>

        <aside className="bio-recommendations-proof" aria-label="LinkedIn recommendation count">
          <p>{recommendations.length} LinkedIn Recommendations</p>

          <div className="bio-recommendations-controls">
            <button
              className="button button-secondary"
              type="button"
              aria-label="Previous recommendations"
              disabled={buttonState.isAtStart}
              onClick={() => handleButtonClick("previous")}
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <button
              className="button button-secondary"
              type="button"
              aria-label="Next recommendations"
              disabled={buttonState.isAtEnd}
              onClick={() => handleButtonClick("next")}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </aside>
      </header>

      <div className="bio-recommendations-rail" ref={railRef}>
        <ul className="bio-recommendations-track" ref={trackRef}>
          {recommendations.map((recommendation) => (
            <li key={recommendation.name}>
              <RecommendationCard recommendation={recommendation} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
