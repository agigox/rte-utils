import React, { useEffect, useState, useRef } from "react";

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
  const containerStyle: React.CSSProperties = {
    backgroundColor,
    position: "relative",
    width: `${width}px`,
    height: "auto",
    padding: "34px 0",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "100%",
  };

  const histogramStyle: React.CSSProperties = {
    height: `${barHeight}px`,
    width: "32px",
    position: "relative",
  };

  const imageStyle: React.CSSProperties = {
    display: "block",
    maxWidth: "none",
    width: "100%",
    height: "100%",
  };

  const textContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    width: "100%",
  };

  const valueContainerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "40px",
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "14px",
    color: "#FFFFFF",
    margin: 0,
    display: "block",
  };

  const unitStyle: React.CSSProperties = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    color: "#FFFFFF",
    margin: 0,
    display: "block",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#DDDFE0",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={histogramStyle}>
          <svg
            width="32"
            height={barHeight}
            viewBox={`0 0 32 ${barHeight}`}
            style={{ display: "block" }}
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
        <div style={textContainerStyle}>
          <div style={valueContainerStyle}>
            <p style={valueStyle}>{value}</p>
            <p style={unitStyle}>{unit}</p>
          </div>
          <div>
            <p style={labelStyle}>{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
