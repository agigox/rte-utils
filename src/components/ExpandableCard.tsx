import React, { useState, useEffect } from 'react';
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
  onToggle: (isExpanded: boolean) => void;
  isExpanded: boolean;
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
  onToggle,
  isExpanded,
}: ExpandableCardProps) => {
  const [showDetails, setShowDetails] = useState(isExpanded);

  // Handle state changes
  useEffect(() => {
    if (isExpanded) {
      setShowDetails(true);
    } else {
      setTimeout(() => {
        setShowDetails(false);
      }, animationDuration);
    }
  }, [isExpanded, animationDuration]);

  const cardStyle: React.CSSProperties = {
    width: isExpanded ? expandedWidth : collapsedWidth,
    height: isExpanded ? expandedHeight : collapsedHeight,
    transition: `width ${animationDuration}ms ease-in-out, height ${animationDuration}ms ease-in-out`,
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
