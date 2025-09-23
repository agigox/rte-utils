import React, { useState } from 'react';
import './ExpandableCard.css';

interface ExpandableCardProps {
  titleContent: React.ReactNode;
  detailsContent: React.ReactNode;
  collapsedWidth?: number;
  collapsedHeight?: number;
  expandedWidth?: number;
  expandedHeight?: number;
  animationDuration?: number;
  top?: number;
  right?: number;
}

export const ExpandableCard = ({
  titleContent,
  detailsContent,
  collapsedWidth = 200,
  collapsedHeight = 60,
  expandedWidth = 400,
  expandedHeight = 300,
  animationDuration = 300,
  top,
  right,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    if (!isExpanded) {
      // Expanding: immediately show details and expand
      setShowDetails(true);
      setIsExpanded(true);
    } else {
      // Collapsing: first collapse, then hide details after animation
      setIsExpanded(false);
      setTimeout(() => {
        setShowDetails(false);
      }, animationDuration);
    }
  };

  const cardStyle: React.CSSProperties = {
    width: isExpanded ? expandedWidth : collapsedWidth,
    height: isExpanded ? expandedHeight : collapsedHeight,
    transition: `width ${animationDuration}ms ease-in-out, height ${animationDuration}ms ease-in-out`,
    cursor: 'pointer',
    ...(top !== undefined &&
      right !== undefined && {
        position: 'fixed',
        top: top,
        right: right,
      }),
  };

  return (
    <div
      className={`expandable-card ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={cardStyle}
      onClick={handleClick}
      data-name="ExpandableCard"
    >
      <div className="expandable-card-content">
        {showDetails ? (
          <div className="expandable-card-details">{detailsContent}</div>
        ) : (
          <div className="expandable-card-title">{titleContent}</div>
        )}
      </div>
    </div>
  );
};
