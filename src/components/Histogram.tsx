import React, { useEffect, useState, useRef } from 'react';
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
  /** Enable gain/loss display when relative value changes */
  showGain?: boolean;
  /** Child components (typically text content) */
  children?: React.ReactNode;
}

export const Histogram: React.FC<HistogramProps> = ({
  max,
  relative,
  barHeight,
  barWidth,
  orientation = 'vertical',
  cornerRadius,
  showGain = false,
  children,
}) => {
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [gainPoints, setGainPoints] = useState<number | null>(null);
  const [isPositiveChange, setIsPositiveChange] = useState<boolean>(true);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const previousValueRef = useRef(relative.value);
  const isFirstRender = useRef(true);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedChangeRef = useRef<number>(0);
  const animationStartValueRef = useRef<number>(relative.value);

  // Measure container dimensions when size props are not provided
  useEffect(() => {
    const measureContainer = () => {
      if (containerRef.current && (!barHeight || !barWidth)) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    measureContainer();
    
    // Add resize observer for responsive behavior
    const resizeObserver = new ResizeObserver(measureContainer);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [barHeight, barWidth]);

  // Use provided dimensions or fall back to container dimensions
  const actualBarHeight = barHeight || containerDimensions.height || 103;
  const actualBarWidth = barWidth || containerDimensions.width || 32;

  // Calculate target dimensions based on orientation
  const targetHeight = (Math.min((relative.value / max.value) * 100, 100) / 100) * actualBarHeight;
  const targetWidth = (Math.min((relative.value / max.value) * 100, 100) / 100) * (orientation === 'horizontal' ? actualBarHeight : actualBarWidth);

  // Detect value change and show gain/loss with accumulation
  useEffect(() => {
    // Skip the first render to avoid showing initial value as gain
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousValueRef.current = relative.value;
      animationStartValueRef.current = relative.value;
      return;
    }

    if (showGain && relative.value !== previousValueRef.current) {
      const changeAmount = relative.value - previousValueRef.current;
      
      // If there's an ongoing animation, cancel it and accumulate the changes
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
        // Add the new change to the accumulated change
        accumulatedChangeRef.current += changeAmount;
      } else {
        // No ongoing animation, start fresh
        animationStartValueRef.current = previousValueRef.current;
        accumulatedChangeRef.current = changeAmount;
      }
      
      // Update previous value
      previousValueRef.current = relative.value;
      
      // Calculate total change from animation start to now
      const totalChange = relative.value - animationStartValueRef.current;
      const isIncrease = totalChange > 0;
      
      setGainPoints(Math.abs(totalChange));
      setIsPositiveChange(isIncrease);
      
      // Set new timer for hiding the animation
      animationTimerRef.current = setTimeout(() => {
        setGainPoints(null);
        animationTimerRef.current = null;
        accumulatedChangeRef.current = 0;
        animationStartValueRef.current = relative.value;
      }, 2000);
      
      return () => {
        if (animationTimerRef.current) {
          clearTimeout(animationTimerRef.current);
          animationTimerRef.current = null;
        }
      };
    } else if (!showGain) {
      // Update previous value even when showGain is false
      previousValueRef.current = relative.value;
      animationStartValueRef.current = relative.value;
    }
  }, [relative.value, showGain]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

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

  const displayWidth = orientation === 'horizontal' ? actualBarHeight : actualBarWidth;
  const displayHeight = orientation === 'horizontal' ? actualBarWidth : actualBarHeight;
  const svgWidth = orientation === 'horizontal' ? actualBarHeight : actualBarWidth;
  const svgHeight = orientation === 'horizontal' ? actualBarWidth : actualBarHeight;

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

  // Determine if we should use responsive sizing
  const isResponsive = !barHeight || !barWidth;
  const responsiveClass = isResponsive ? 'histogram-container--responsive' : '';

  return (
    <div
      ref={containerRef}
      className={`histogram-container ${orientation === 'horizontal' ? 'histogram-container--horizontal' : ''} ${responsiveClass}`}
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
          
          {/* Gain/Loss display */}
          {showGain && gainPoints && (
            <div className="histogram-gain-area">
              <div className={`histogram-gain-points ${isPositiveChange ? 'histogram-gain-points--positive' : 'histogram-gain-points--negative'}`}>
                {isPositiveChange ? '+' : '-'}{gainPoints}
              </div>
            </div>
          )}
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
