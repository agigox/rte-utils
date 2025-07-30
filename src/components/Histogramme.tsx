import React, { useEffect, useState, useRef } from "react";
import "./Histogramme.css";

interface HistogrammeProps {
  /** Maximum value for the bar chart */
  maxValue: number;
  /** Relative/current value to compare against max */
  relativeValue: number;
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
  /** Width of the component in pixels */
  width?: number;
}

export const Histogramme: React.FC<HistogrammeProps> = ({
  maxValue,
  relativeValue,
  value,
  unit,
  label,
  backgroundColor = "#005896",
  barHeight = 103,
  width = 54,
}) => {
  // Animation state
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValueRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  // Calculate the height percentages for the two bars
  const maxPercentage = 100;
  const relativePercentage = Math.min((relativeValue / maxValue) * 100, 100);

  // Calculate actual heights in pixels
  const maxBarHeight = barHeight;
  const targetRelativeBarHeight = (relativePercentage / 100) * barHeight;
  const currentRelativeBarHeight = isAnimating
    ? animatedHeight
    : targetRelativeBarHeight;

  // Animation effect
  useEffect(() => {
    const targetHeight =
      (Math.min((relativeValue / maxValue) * 100, 100) / 100) * barHeight;

    // On initial mount, start from 0
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setIsAnimating(true);
      setAnimatedHeight(0);
      previousValueRef.current = relativeValue;

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
      previousValueRef.current !== relativeValue
    ) {
      const previousHeight =
        (Math.min((previousValueRef.current / maxValue) * 100, 100) / 100) *
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

    previousValueRef.current = relativeValue;
  }, [relativeValue, maxValue, barHeight]);

  return (
    <div 
      className="histogramme-container"
      style={{ 
        backgroundColor,
        width: `${width}px`
      }}
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
              fill="#D3D64E"
              rx="2"
            />
            {/* Foreground bar (relative value) with animation */}
            <rect
              x="0"
              y={barHeight - currentRelativeBarHeight}
              width="32"
              height={currentRelativeBarHeight}
              fill="#C0C402"
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
