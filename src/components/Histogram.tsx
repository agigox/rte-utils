import React, { useEffect, useState } from 'react';
import './Histogram.css';

interface HistogramProps {
  /** Maximum value configuration with value and color */
  max: {
    value: number;
    color: string;
    opacity?: number;
  };
  /** Relative/current value configuration with value and color */
  relative: {
    value: number;
    color: string;
  };
  /** Height of the histogram bar in pixels */
  barHeight?: number;
  /** Width of the histogram bar in pixels */
  barWidth?: number;
  /** Orientation of the histogram - 'vertical' or 'horizontal' */
  orientation?: 'vertical' | 'horizontal';
  /** Corner radius configuration for individual corners */
  cornerRadius?: {
    topLeft?: number;
    topRight?: number;
    bottomLeft?: number;
    bottomRight?: number;
  };
  /** Child components (typically text content) */
  children?: React.ReactNode;
}

export const Histogram: React.FC<HistogramProps> = ({
  max,
  relative,
  barHeight = 103,
  barWidth = 32,
  orientation = 'vertical',
  cornerRadius,
  children,
}) => {
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  // Calculate target dimensions based on orientation
  const targetHeight = (Math.min((relative.value / max.value) * 100, 100) / 100) * barHeight;
  const targetWidth = (Math.min((relative.value / max.value) * 100, 100) / 100) * (orientation === 'horizontal' ? barHeight : barWidth);

  // Simple Chart.js-like animation: always animate from 0 to target
  useEffect(() => {
    setAnimatedHeight(0);
    setAnimatedWidth(0);

    const startTime = Date.now();
    const duration = 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Chart.js-like easing (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedHeight(targetHeight * easeOutQuart);
      setAnimatedWidth(targetWidth * easeOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetHeight, targetWidth]);

  const displayWidth = orientation === 'horizontal' ? barHeight : barWidth;
  const displayHeight = orientation === 'horizontal' ? barWidth : barHeight;
  const svgWidth = orientation === 'horizontal' ? barHeight : barWidth;
  const svgHeight = orientation === 'horizontal' ? barWidth : barHeight;

  // Helper function to create rounded rectangle path
  const createRoundedRectPath = (
    x: number,
    y: number,
    width: number,
    height: number,
    radii: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number }
  ) => {
    const { topLeft, topRight, bottomLeft, bottomRight } = radii;

    return `
      M ${x + topLeft} ${y}
      L ${x + width - topRight} ${y}
      Q ${x + width} ${y} ${x + width} ${y + topRight}
      L ${x + width} ${y + height - bottomRight}
      Q ${x + width} ${y + height} ${x + width - bottomRight} ${y + height}
      L ${x + bottomLeft} ${y + height}
      Q ${x} ${y + height} ${x} ${y + height - bottomLeft}
      L ${x} ${y + topLeft}
      Q ${x} ${y} ${x + topLeft} ${y}
      Z
    `
      .trim()
      .replace(/\s+/g, ' ');
  };

  // Default corner radius values
  const defaultCornerRadius = { topLeft: 2, topRight: 2, bottomLeft: 2, bottomRight: 2 };
  const corners = cornerRadius
    ? {
        topLeft: cornerRadius.topLeft ?? defaultCornerRadius.topLeft,
        topRight: cornerRadius.topRight ?? defaultCornerRadius.topRight,
        bottomLeft: cornerRadius.bottomLeft ?? defaultCornerRadius.bottomLeft,
        bottomRight: cornerRadius.bottomRight ?? defaultCornerRadius.bottomRight,
      }
    : defaultCornerRadius;

  return (
    <div
      className={`histogram-container ${orientation === 'horizontal' ? 'histogram-container--horizontal' : ''}`}
    >
      <div
        className={`histogram-content ${orientation === 'horizontal' ? 'histogram-content--horizontal' : ''}`}
      >
        <div
          className="histogram-bar"
          style={{
            height: `${displayHeight}px`,
            width: `${displayWidth}px`,
          }}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="histogram-svg"
          >
            {/* Define clipping path with rounded corners matching the background */}
            <defs>
              <clipPath id={`histogram-clip-${svgWidth}-${svgHeight}-${corners.topLeft}`}>
                <path d={createRoundedRectPath(0, 0, svgWidth, svgHeight, corners)} />
              </clipPath>
            </defs>
            
            {/* Background bar (max value) */}
            <path
              d={createRoundedRectPath(0, 0, svgWidth, svgHeight, corners)}
              fill={max.color}
              fillOpacity={max.opacity || 1}
            />
            
            {/* Foreground bar (relative value) with clipping to stay within rounded corners */}
            {orientation === 'vertical' ? (
              <path
                d={createRoundedRectPath(0, svgHeight - animatedHeight, svgWidth, animatedHeight, {
                  topLeft: animatedHeight >= svgHeight ? corners.topLeft : 0,
                  topRight: animatedHeight >= svgHeight ? corners.topRight : 0,
                  bottomLeft: corners.bottomLeft,
                  bottomRight: corners.bottomRight,
                })}
                fill={relative.color}
                clipPath={`url(#histogram-clip-${svgWidth}-${svgHeight}-${corners.topLeft})`}
              />
            ) : (
              <path
                d={createRoundedRectPath(0, 0, animatedWidth, svgHeight, {
                  topLeft: corners.topLeft,
                  topRight: animatedWidth >= svgWidth ? corners.topRight : 0,
                  bottomLeft: corners.bottomLeft,
                  bottomRight: animatedWidth >= svgWidth ? corners.bottomRight : 0,
                })}
                fill={relative.color}
                clipPath={`url(#histogram-clip-${svgWidth}-${svgHeight}-${corners.topLeft})`}
              />
            )}
          </svg>
        </div>
        {children && (
          <div
            className={`histogram-text-container ${orientation === 'horizontal' ? 'histogram-text-container--horizontal' : ''}`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
