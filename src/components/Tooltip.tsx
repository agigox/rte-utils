import { useState, ReactNode } from 'react';
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
}

export const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={`tooltip tooltip-${position}`}>{content}</div>}
    </div>
  );
};
