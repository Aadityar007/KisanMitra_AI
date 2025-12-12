
import React, { useEffect, useState } from 'react';
import type { Translations, Language } from '../types';
import { getAgriculturalNews, type ParsedNewsItem } from '../services/geminiService';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface MarketWeatherViewProps {
    translations: Translations;
    language: Language;
}

export const MarketWeatherView: React.FC<MarketWeatherViewProps> = ({ translations, language }) => {
    const [news, setNews] = useState<ParsedNewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    const t = translations.marketWeather;

    const fetchNews = async () => {
        setIsLoading(true);
        setError(false);
        try {
            const items = await getAgriculturalNews(language.name);
            if (items.length > 0) {
                setNews(items);
                setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [language.name]);

    const marketItems = news.filter(i => i.category === 'market');
    const weatherItems = news.filter(i => i.category === 'weather');
    // Fallback for items that might be general but fit into the feed
    const generalItems = news.filter(i => i.category === 'general');

    const renderListItem = (item: ParsedNewsItem, idx: number, type: 'market' | 'weather') => {
        // Attempt to split content for better formatting (e.g. Commodity: Price)
        // Expected format: "Wheat: ₹2400/q - MP (Up)"
        const parts = item.content.split(':');
        const title = parts[0];
        const detail = parts.length > 1 ? parts.slice(1).join(':') : '';

        return (
            <div key={idx} className="flex items-center p-4 bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${type === 'market' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                    {type === 'market' ? (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                    )}
                </div>
                <div className="flex-grow min-w-0">
                    {detail ? (
                        <>
                            <p className="text-sm font-semibold text-gray-900 truncate">{title.trim()}</p>
                            <p className="text-sm text-gray-600 truncate">{detail.trim()}</p>
                        </>
                    ) : (
                         <p className="text-sm font-medium text-gray-800">{item.content}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* App-like Header */}
            <header className="bg-white px-6 py-4 shadow-sm border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">{t.title}</h2>
                    <p className="text-xs text-gray-500">
                        {lastUpdated ? `Updated ${lastUpdated}` : t.description}
                    </p>
                </div>
                <button 
                    onClick={fetchNews} 
                    className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    disabled={isLoading}
                    title={t.refresh}
                >
                    {isLoading ? <SpinnerIcon className="w-5 h-5 text-green-600" /> : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    )}
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {isLoading && !news.length ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <SpinnerIcon className="w-8 h-8 mb-3 text-gray-300" />
                        <p className="text-sm">{t.loading}</p>
                    </div>
                ) : error && !news.length ? (
                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600 text-sm mb-2">{t.error}</p>
                        <button onClick={fetchNews} className="text-xs font-bold uppercase tracking-wide text-red-700 hover:text-red-800">Retry</button>
                     </div>
                ) : (
                    <>
                        {/* Weather Section */}
                        {(weatherItems.length > 0) && (
                            <section>
                                <div className="flex items-center mb-2 px-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.categories.weather}</span>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    {weatherItems.map((item, idx) => renderListItem(item, idx, 'weather'))}
                                </div>
                            </section>
                        )}

                        {/* Market Section */}
                        {(marketItems.length > 0 || generalItems.length > 0) && (
                            <section>
                                <div className="flex items-center mb-2 px-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{t.categories.market}</span>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    {marketItems.map((item, idx) => renderListItem(item, idx, 'market'))}
                                    {generalItems.map((item, idx) => renderListItem(item, idx + 100, 'market'))}
                                </div>
                            </section>
                        )}
                        
                        {!weatherItems.length && !marketItems.length && !generalItems.length && (
                             <div className="text-center py-10 text-gray-500">
                                <p>No specific updates available.</p>
                             </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
