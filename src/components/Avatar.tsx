import React from 'react';
import './Avatar.css';

interface AvatarProps {
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ children }) => {
  return (
    <div className="avatar-container avatar-container--clickable">
      <div className="avatar-content">{children}</div>
    </div>
  );
};
