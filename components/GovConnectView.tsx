
import React, { useState } from 'react';
import type { Translations } from '../types';

interface GovConnectViewProps {
    translations: Translations;
}

const AdvisoryCard: React.FC<{ title: string; date: string; content: string }> = ({ title, date, content }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-4 hover:border-blue-300 transition-colors">
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{date}</span>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm">{content}</p>
    </div>
);

export const GovConnectView: React.FC<GovConnectViewProps> = ({ translations }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [queryType, setQueryType] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    // Set default if not set
    if (!queryType && translations.gov.form.queryTypes.length > 0) {
        setQueryType(translations.gov.form.queryTypes[0]);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you would typically send the data to a backend
        console.log({ name, location, queryType, message });
    };

    const t = translations.gov;

    return (
        <div className="h-full overflow-y-auto p-6 sm:p-8 md:p-12 bg-gray-50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 pb-8">
                <div>
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
                        <p className="text-lg text-gray-600">{t.subtitle}</p>
                    </header>
                    {submitted ? (
                         <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center text-center" role="alert">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <p className="font-bold text-lg mb-1">{t.form.success}</p>
                            <p>{t.form.successMsg}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.name}</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.location}</label>
                                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" />
                            </div>
                            <div>
                                <label htmlFor="queryType" className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.type}</label>
                                <select id="queryType" value={queryType} onChange={(e) => setQueryType(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white">
                                    {t.form.queryTypes.map((type, idx) => (
                                        <option key={idx} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.message}</label>
                                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95">{t.form.submit}</button>
                        </form>
                    )}
                </div>
                <div>
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.advisories}</h2>
                        <p className="text-lg text-gray-600">{t.advisoriesSubtitle}</p>
                    </header>
                    <div className="space-y-4">
                        {t.demoAdvisories.length > 0 ? (
                            t.demoAdvisories.map((advisory, idx) => (
                                <AdvisoryCard 
                                    key={idx}
                                    title={advisory.title}
                                    date={advisory.date}
                                    content={advisory.content}
                                />
                            ))
                        ) : (
                            <div className="bg-gray-100 rounded-xl p-8 text-center">
                                <p className="text-gray-500">No active advisories.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
