
import React from 'react';
import { ViewType } from '../types';
import type { NavItem, Translations } from '../types';

interface DashboardViewProps {
  onViewChange: (view: ViewType) => void;
  navItems: NavItem[];
  translations: Translations;
}

const Widget: React.FC<{ item: NavItem; onClick: () => void }> = ({ item, onClick }) => (
  <button 
    onClick={onClick} 
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-300 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center text-center aspect-square"
  >
    <div className="p-4 bg-green-50 rounded-full mb-4 text-green-600">
      <item.icon className="w-8 h-8" />
    </div>
    <h3 className="text-base font-bold text-gray-800">{item.label}</h3>
  </button>
);

export const DashboardView: React.FC<DashboardViewProps> = ({ onViewChange, navItems, translations }) => {
    const dashboardItems = navItems.filter(item => item.id !== ViewType.DASHBOARD);
  return (
    <div className="h-full overflow-y-auto bg-gray-50 flex flex-col">
      <header className="px-8 pt-12 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{translations.appTitle}</h1>
            <p className="text-gray-500">{translations.dashboard.subtitle}</p>
      </header>
        
      <div className="flex-1 px-8 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardItems.map(item => (
                <Widget 
                    key={item.id} 
                    item={item} 
                    onClick={() => onViewChange(item.id)} 
                />
            ))}
        </div>
        
        {/* Helper text or footer area */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start space-x-3">
             <div className="text-blue-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
             </div>
             <div>
                 <p className="text-sm text-blue-800 font-medium">Daily Tip</p>
                 <p className="text-sm text-blue-600">Update your app language in the sidebar to get news in your local dialect.</p>
             </div>
        </div>
      </div>
    </div>
  );
};
