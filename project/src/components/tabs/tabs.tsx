import cn from 'classnames';
import React, { useState } from 'react';

type tabsProps = {
  tabTitles: string[];
  children: JSX.Element[];
}

function Tabs({ tabTitles, children }: tabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('tab-1');

  const tabClickHandle = (e: React.MouseEvent<HTMLElement>) => {
    const tabId = (e.target as HTMLElement).id;

    if (tabId) {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="tabs product__tabs">
      <div
        className="tabs__controls product__tabs-controls"
        onClick={tabClickHandle}
      >
        {tabTitles.map((tabName, index) => (
          <button
            key={tabName}
            className={cn('tabs__control', {'is-active': activeTab === `tab-${index + 1}`})}
            type="button"
            id={`tab-${index + 1}`}
          >{tabName}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {tabTitles.map((tabName, index) => (
          <div key={tabName} className={cn('tabs__element', {'is-active': activeTab === `tab-${index + 1}`})}>
            {children[index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
