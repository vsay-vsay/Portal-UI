import { useState } from "react";

const TabsComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-neutral-700">
        <nav className="flex gap-x-1" aria-label="Tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`py-4 px-3 inline-flex items-center gap-x-2 border-b-2 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none
                ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-500 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-400 dark:text-neutral-400 dark:hover:text-blue-500"
                }
              `}
              id={`${tab.id}-tab`}
              aria-controls={tab.id}
              aria-selected={activeTab === tab.id}
              role="tab"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tabs Content */}
      <div className="mt-3">
        {tabs.map((tab) =>
          activeTab === tab.id ? (
            <div key={tab.id} id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`}>
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabsComponent;
