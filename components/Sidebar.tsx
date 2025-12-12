
import React, { useState } from 'react';
import type { ViewType, NavItem, SidebarProps } from '../types';
import { LanguageSelector } from './LanguageSelector';

export const Sidebar: React.FC<SidebarProps> = ({ 
    currentView, 
    onViewChange, 
    navItems, 
    selectedLanguage, 
    onLanguageChange, 
    translations,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-white text-gray-800 shadow-md border border-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 flex flex-col w-72 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl md:shadow-none`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
           <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white mr-3">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
           </div>
           <h1 className="text-lg font-bold text-gray-900 tracking-tight">{translations.appTitle}</h1>
        </div>
        
        <nav className="flex-grow p-4 overflow-y-auto">
          <div className="mb-4">
             <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
             <ul className="space-y-1">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                      onViewChange(item.id);
                      setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      currentView === item.id 
                      ? 'bg-green-50 text-green-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${currentView === item.id ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <LanguageSelector 
                selectedLanguage={selectedLanguage} 
                onLanguageChange={onLanguageChange}
                label={translations.sidebar.language}
            />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
