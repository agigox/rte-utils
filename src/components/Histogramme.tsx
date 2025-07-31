import React, { useEffect, useState, useRef } from "react";
import "./Histogramme.css";

interface HistogrammeProps {
  /** Maximum value configuration with value and color */
  max: {
    value: number;
    color: string;
  };
  /** Relative/current value configuration with value and color */
  relative: {
    value: number;
    color: string;
  };
  /** Value to display in text */
  value: number;
  /** Unit label (e.g., "MWh") */
  unit: string;
  /** Description label (e.g., "Soutirage") */
  label: string;
  /** Background color of the container */
  backgroundColor?: string;
  /** Height of the histogram bar in pixels */
  barHeight?: number;
}

export const Histogramme: React.FC<HistogrammeProps> = ({
  max,
  relative,
  value,
  unit,
  label,
  barHeight = 103,
}) => {
  // Animation state
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValueRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  // Calculate the height percentages for the two bars
  const relativePercentage = Math.min((relative.value / max.value) * 100, 100);

  // Calculate actual heights in pixels
  const maxBarHeight = barHeight;
  const targetRelativeBarHeight = (relativePercentage / 100) * barHeight;
  const currentRelativeBarHeight = isAnimating
    ? animatedHeight
    : targetRelativeBarHeight;

  // Animation effect
  useEffect(() => {
    const targetHeight =
      (Math.min((relative.value / max.value) * 100, 100) / 100) * barHeight;

    // On initial mount, start from 0
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setIsAnimating(true);
      setAnimatedHeight(0);
      previousValueRef.current = relative.value;

      const startTime = Date.now();
      const duration = 1000; // 2 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Chart.js-like easing function (easeOutQuart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentHeight = targetHeight * easeOutQuart;
        setAnimatedHeight(currentHeight);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
      return;
    }

    // For subsequent updates, animate from previous value to new value
    if (
      previousValueRef.current !== null &&
      previousValueRef.current !== relative.value
    ) {
      const previousHeight =
        (Math.min((previousValueRef.current / max.value) * 100, 100) / 100) *
        barHeight;
      setIsAnimating(true);
      setAnimatedHeight(previousHeight);

      const startTime = Date.now();
      const duration = 2000; // 2 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Chart.js-like easing function (easeOutQuart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentHeight =
          previousHeight + (targetHeight - previousHeight) * easeOutQuart;
        setAnimatedHeight(currentHeight);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    } else if (previousValueRef.current === null) {
      // Set initial value without animation if no previous value
      setAnimatedHeight(targetHeight);
    }

    previousValueRef.current = relative.value;
  }, [relative.value, max.value, barHeight]);

  return (
    <div 
      className="histogramme-container"
    >
      <div className="histogramme-content">
        <div 
          className="histogramme-bar"
          style={{
            height: `${barHeight}px`,
            width: "32px"
          }}
        >
          <svg
            width="32"
            height={barHeight}
            viewBox={`0 0 32 ${barHeight}`}
            className="histogramme-svg"
          >
            {/* Background bar (max value) */}
            <rect
              x="0"
              y={barHeight - maxBarHeight}
              width="32"
              height={maxBarHeight}
              fill={max.color}
              rx="2"
            />
            {/* Foreground bar (relative value) with animation */}
            <rect
              x="0"
              y={barHeight - currentRelativeBarHeight}
              width="32"
              height={currentRelativeBarHeight}
              fill={relative.color}
              rx="2"
            />
          </svg>
        </div>
        <div className="histogramme-text-container">
          <div className="histogramme-value-container">
            <p className="histogramme-value">{value}</p>
            <p className="histogramme-unit">{unit}</p>
          </div>
          <div>
            <p className="histogramme-label">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
