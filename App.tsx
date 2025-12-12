
import React, { useState, useMemo, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { GovConnectView } from './components/GovConnectView';
import { ChatView } from './components/ChatView';
import { MarketWeatherView } from './components/MarketWeatherView';
import { ViewType, Language, type ChatViewHandles } from './types';
import type { NavItem } from './types';
import { LANGUAGES, TRANSLATIONS } from './constants';
import { DashboardIcon } from './components/icons/DashboardIcon';
import { PlantIcon } from './components/icons/PlantIcon';
import { MarketIcon } from './components/icons/MarketIcon';
import { GovIcon } from './components/icons/GovIcon';

const App: React.FC = () => {
    // App is always open now (Standard responsive web app)
    const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
    const chatViewRef = useRef<ChatViewHandles>(null);

    // Get current translations
    const t = TRANSLATIONS[selectedLanguage.code] || TRANSLATIONS['en'];

    // Dynamic Navigation Items - Removed Image Generation
    const navItems = useMemo<NavItem[]>(() => [
        { id: ViewType.DASHBOARD, label: t.sidebar.dashboard, icon: DashboardIcon },
        { id: ViewType.CROP_ADVISORY, label: t.sidebar.cropAdvisory, icon: PlantIcon },
        { id: ViewType.MARKET_WEATHER, label: t.sidebar.marketWeather, icon: MarketIcon },
        { id: ViewType.GOV_CONNECT, label: t.sidebar.govConnect, icon: GovIcon },
    ], [t]);

    const renderView = () => {
        switch (currentView) {
            case ViewType.DASHBOARD:
                return <DashboardView onViewChange={setCurrentView} navItems={navItems} translations={t} />;
            case ViewType.CROP_ADVISORY:
                const prompts = t.cropAdvisory.prompts.map((text, idx) => ({
                    text,
                    upload: idx === 0 
                }));
                return <ChatView 
                    key="crop-advisory"
                    ref={chatViewRef}
                    title={t.cropAdvisory.title}
                    description={t.cropAdvisory.description}
                    language={selectedLanguage}
                    allowImageUpload={true}
                    examplePrompts={prompts}
                    translations={t}
                />;
            case ViewType.MARKET_WEATHER:
                return <MarketWeatherView 
                    translations={t} 
                    language={selectedLanguage} 
                />;
            case ViewType.GOV_CONNECT:
                return <GovConnectView translations={t} />;
            default:
                return <DashboardView onViewChange={setCurrentView} navItems={navItems} translations={t} />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-white flex h-dvh font-sans overflow-hidden">
            <Sidebar 
                currentView={currentView} 
                onViewChange={setCurrentView} 
                navItems={navItems}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                translations={t}
            />
            <div className="flex-1 flex flex-col md:ml-72 h-full relative z-10">
                 <main className="flex-1 flex flex-col overflow-hidden bg-gray-50/90 w-full relative">
                    {renderView()}
                </main>
            </div>

            {/* Farmer Aesthetic: Crop Silhouette Decoration */}
            <div className="fixed bottom-0 left-0 w-full z-0 pointer-events-none opacity-10 text-green-800 hidden md:block">
                <svg viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L1440 120V80C1440 80 1400 90 1380 60C1360 30 1340 100 1320 120M0 120L60 60C80 40 100 120 120 120M120 120L160 50C180 30 200 120 220 120M220 120L260 70C280 50 300 120 320 120M320 120L360 40C380 20 400 120 420 120M420 120L460 65C480 45 500 120 520 120M520 120L560 30C580 10 600 120 620 120M620 120L660 75C680 55 700 120 720 120M720 120L760 45C780 25 800 120 820 120M820 120L860 80C880 60 900 120 920 120M920 120L960 35C980 15 1000 120 1020 120M1020 120L1060 70C1080 50 1100 120 1120 120M1120 120L1160 40C1180 20 1200 120 1220 120M1220 120L1260 80C1280 60 1300 120 1320 120" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M0,120 h1440 v-10 c-20,0 -30,-40 -50,-40 c-20,0 -30,40 -50,40 c-20,0 -30,-60 -50,-60 c-20,0 -30,60 -50,60 c-20,0 -30,-30 -50,-30 c-20,0 -30,30 -50,30 c-20,0 -30,-70 -50,-70 c-20,0 -30,70 -50,70 c-20,0 -30,-40 -50,-40 c-20,0 -30,40 -50,40 c-20,0 -30,-50 -50,-50 c-20,0 -30,50 -50,50 c-20,0 -30,-20 -50,-20 c-20,0 -30,20 -50,20 c-20,0 -30,-80 -50,-80 c-20,0 -30,80 -50,80 c-20,0 -30,-30 -50,-30 c-20,0 -30,30 -50,30 c-20,0 -30,-60 -50,-60 c-20,0 -30,60 -50,60 c-20,0 -30,-40 -50,-40 c-20,0 -30,40 -50,40 c-20,0 -30,-20 -50,-20 c-20,0 -30,20 -50,20 c-20,0 -30,-90 -50,-90 c-20,0 -30,90 -50,90 c-20,0 -30,-30 -50,-30 c-20,0 -30,30 -50,30 c-20,0 -30,-50 -50,-50 c-20,0 -30,50 -50,50 Z" fill="currentColor"/>
                </svg>
            </div>
            
             {/* Mobile version of crops */}
             <div className="fixed bottom-0 left-0 w-full z-0 pointer-events-none opacity-5 text-green-800 md:hidden">
                <svg viewBox="0 0 1440 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0,60 h1440 v-5 c-10,0 -15,-20 -25,-20 c-10,0 -15,20 -25,20 c-10,0 -15,-30 -25,-30 c-10,0 -15,30 -25,30 Z" fill="currentColor"/>
                     <path d="M0 60 H1440 V40 C1400 40 1380 20 1360 60 H0Z" fill="currentColor"/>
                </svg>
             </div>
        </div>
    );
};

export default App;
