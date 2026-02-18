import React, { ReactNode, useState } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  /**
   * The content to display inside the tooltip
   */
  content: string;
  /**
   * The trigger element that shows the tooltip on hover
   */
  children: ReactNode;
  /**
   * Position of the tooltip relative to the trigger element
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Distance in pixels between the tooltip and the trigger element
   * default 8
   */
  offset?: number;
}

export const Tooltip = ({ content, children, position = 'top', offset = 8 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getOffsetStyle = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return { bottom: `calc(100% + ${offset}px)` };
      case 'bottom':
        return { top: `calc(100% + ${offset}px)` };
      case 'left':
        return { right: `calc(100% + ${offset}px)` };
      case 'right':
        return { left: `calc(100% + ${offset}px)` };
    }
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`tooltip tooltip-${position}`} style={getOffsetStyle()}>
          {content}
        </div>
      )}
    </div>
  );
};
