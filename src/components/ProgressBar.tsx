import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  progressEndDate?: number;
  leftTime?: number;
  progressTime?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progressEndDate, 
  leftTime, 
  progressTime, 
  className = '' 
}) => {
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (progressEndDate && !leftTime && !progressTime) {
      const updateProgress = () => {
        const now = Date.now();
        const timeLeft = Math.max(0, progressEndDate - now);
        const totalTime = progressEndDate - startTime;
        const elapsed = now - startTime;
        const progressPercent = Math.max(0, Math.min(100, (elapsed / totalTime) * 100));
        setProgress(progressPercent);

        if (timeLeft <= 0) {
          setProgress(100);
          if (interval) clearInterval(interval);
        }
      };

      updateProgress();
      interval = setInterval(updateProgress, 100);
    } else if (leftTime !== undefined && progressTime !== undefined) {
      const progressPercent = Math.max(0, Math.min(100, ((progressTime - leftTime) / progressTime) * 100));
      setProgress(progressPercent);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [progressEndDate, leftTime, progressTime, startTime]);

  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
