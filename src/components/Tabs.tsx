import React, { useState } from 'react';
import './Tabs.css';

interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  children?: React.ReactNode;
  theme?: 'light' | 'black';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className = '',
  children,
  theme = 'light',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const currentActiveTab = activeTabId || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  return (
    <div className={`tabs-container tabs-container--${theme} ${className}`}>
      <div className="tabs-header">
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveTab;
          return (
            <div
              key={tab.id}
              className={`tab-item ${isActive ? 'tab-item--active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="tab-content">
                <span className="tab-label">{tab.label}</span>
                {tab.count !== undefined && (
                  <div className={`tab-count ${isActive ? 'tab-count--active' : ''}`}>
                    {tab.count}
                  </div>
                )}
              </div>
              <div className={`tab-divider ${isActive ? 'tab-divider--active' : ''}`} />
            </div>
          );
        })}
      </div>
      {children && (
        <div className="tabs-body">
          {children}
        </div>
      )}
    </div>
  );
};