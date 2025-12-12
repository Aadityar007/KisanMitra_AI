
import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import type { ChatMessage, Language, Source, ChatViewHandles, Translations } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { streamChat } from '../services/geminiService';
import { SendIcon } from './icons/SendIcon';
import { MicIcon } from './icons/MicIcon';
import { UploadIcon } from './icons/UploadIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import type { Content } from '@google/genai';

const Message: React.FC<{ message: ChatMessage; t: Translations['chat'] }> = ({ message, t }) => {
    const isModel = message.role === 'model';
    const sources = message.parts.flatMap(p => p.sources || []);
    return (
        <div className={`flex ${isModel ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`max-w-xl p-4 rounded-2xl shadow-sm ${isModel ? 'bg-white border border-gray-100 text-gray-800' : 'bg-green-600 text-white'}`}>
                {message.image && <img src={message.image} alt="user upload" className="rounded-lg mb-2 max-h-60 object-cover" />}
                {message.isLoading
                    ? <div className="flex items-center space-x-2 text-gray-500"><SpinnerIcon className="w-5 h-5" /><p>{t.thinking}</p></div>
                    : message.parts.map((part, index) => <p key={index} className="whitespace-pre-wrap leading-relaxed">{part.text}</p>)
                }
                 {sources.length > 0 && (
                    <div className={`mt-3 pt-2 border-t ${isModel ? 'border-gray-100' : 'border-green-500'}`}>
                        <h4 className={`font-semibold text-xs mb-1 ${isModel ? 'text-gray-500' : 'text-green-100'}`}>{t.sources}</h4>
                        <ul className="list-disc list-inside text-xs">
                            {sources.map((source, i) => (
                                <li key={i} className="truncate">
                                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className={`hover:underline ${isModel ? 'text-blue-600' : 'text-white'}`}>
                                        {source.title || source.uri}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

interface ChatViewProps {
    title: string;
    description: string;
    language: Language;
    useSearch?: boolean;
    allowImageUpload?: boolean;
    examplePrompts?: { text: string; upload?: boolean }[];
    translations: Translations;
}

export const ChatView = forwardRef<ChatViewHandles, ChatViewProps>(({ title, description, language, useSearch = false, allowImageUpload = false, examplePrompts = [], translations }, ref) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const onTranscriptChange = useCallback((transcript: string) => {
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
    }, []);

    const { isListening, toggleListening, hasRecognitionSupport, error: speechError } = useSpeechRecognition(onTranscriptChange);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleExampleClick = (prompt: { text: string; upload?: boolean }) => {
        setInput(prompt.text);
        if (prompt.upload && allowImageUpload) {
            fileInputRef.current?.click();
        }
    };
    
    const sendMessage = useCallback(async () => {
        if ((!input.trim() && !imageFile) || isLoading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            parts: [{ text: input }],
            image: imagePreview || undefined,
        };
        
        // Add user message and a placeholder for the model response
        setMessages(prev => [...prev, userMessage, { role: 'model', parts: [], isLoading: true }]);
        setInput('');
        setImageFile(null);
        setImagePreview(null);
        setIsLoading(true);

        try {
            // Filter out the last message (the loading one) and any messages without text parts to avoid API errors
            const history: Content[] = messages
                .filter(msg => !msg.isLoading && msg.parts.length > 0 && msg.parts.some(p => p.text.trim() !== ''))
                .map(msg => ({
                    role: msg.role,
                    parts: msg.parts.map(p => ({text: p.text}))
                }));

            const stream = await streamChat({ prompt: input, image: imageFile, language: language.name, useSearch, history });
            
            let currentText = '';
            let currentSources: Source[] = [];
            
            setMessages(prev => prev.slice(0, -1)); // Remove loader
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

            for await (const chunk of stream) {
                const text = chunk.text;
                const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
                if(groundingMetadata?.groundingChunks) {
                    currentSources = groundingMetadata.groundingChunks
                        .map((c: any) => c.web)
                        .filter(Boolean) as Source[];
                }

                if (text) currentText += text;

                setMessages(prev => {
                    const lastMsgIndex = prev.length - 1;
                    const newMessages = [...prev];
                    if (newMessages[lastMsgIndex]?.role === 'model') {
                        newMessages[lastMsgIndex] = { ...newMessages[lastMsgIndex], parts: [{ text: currentText, sources: currentSources }] };
                    }
                    return newMessages;
                });
            }

        } catch (error) {
            console.error("Error streaming chat:", error);
             setMessages(prev => {
                const lastMsgIndex = prev.length - 1;
                const newMessages = [...prev];
                if(newMessages[lastMsgIndex]?.isLoading || newMessages[lastMsgIndex]?.role === 'model') {
                    // Replace loader or partial message with error
                    newMessages[lastMsgIndex] = { role: 'model', parts: [{ text: translations.chat.error }] };
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, [input, imageFile, isLoading, imagePreview, messages, language.name, useSearch, translations.chat.error]);
    
    useImperativeHandle(ref, () => ({
        sendMessage,
    }));
    
    return (
        <div className="flex flex-col h-full bg-gray-50 relative z-0">
            <header className="px-6 py-4 bg-white border-b border-gray-100 flex-shrink-0 z-10">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </header>
            
            <main className="flex-grow p-6 overflow-y-auto z-0">
                {messages.length === 0 && examplePrompts.length > 0 && (
                     <div className="mt-8">
                        <p className="text-gray-500 mb-4 text-sm font-medium uppercase tracking-wide">{translations.chat.startPrompt}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {examplePrompts.map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleExampleClick(prompt)}
                                    className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-left text-gray-700 hover:border-green-500 hover:text-green-700 transition-all duration-200 flex items-center space-x-3 group"
                                >
                                    {prompt.upload && <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100"><UploadIcon className="w-5 h-5 text-green-600" /></div>}
                                    <span className="font-medium">{prompt.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {messages.map((msg, index) => <Message key={index} message={msg} t={translations.chat} />)}
                
                {messages.length === 0 && examplePrompts.length === 0 && (
                     <div className="h-full flex items-center justify-center text-gray-400">
                        <p>{translations.chat.startPrompt}</p>
                     </div>
                )}
                <div ref={chatEndRef} />
            </main>

            <footer className="p-4 bg-white border-t border-gray-100 flex-shrink-0 z-20">
                <div className="max-w-4xl mx-auto w-full">
                    {imagePreview && (
                        <div className="relative w-20 h-20 mb-3 animate-in fade-in slide-in-from-bottom-2">
                            <img src={imagePreview} alt="upload preview" className="w-full h-full object-cover rounded-xl shadow-md border border-gray-200" />
                            <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black transition-colors">&times;</button>
                        </div>
                    )}
                    
                    <div className="flex items-end space-x-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
                        {allowImageUpload && (
                             <>
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                                <button 
                                    onClick={() => fileInputRef.current?.click()} 
                                    className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors" 
                                    disabled={isLoading} 
                                    title={translations.chat.uploadImage}
                                >
                                    <UploadIcon className="w-6 h-6" />
                                </button>
                             </>
                        )}
                        
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                            placeholder={translations.chat.inputPlaceholder}
                            className="flex-grow p-3 bg-transparent border-none resize-none focus:ring-0 text-gray-800 placeholder-gray-400 max-h-32"
                            rows={1}
                            disabled={isLoading}
                        />
                        
                        {hasRecognitionSupport && (
                            <button 
                                onClick={() => toggleListening(language.code)} 
                                className={`p-3 rounded-xl transition-all duration-200 ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`} 
                                disabled={isLoading}
                                title="Voice Input"
                            >
                                <MicIcon className="w-6 h-6" />
                            </button>
                        )}
                        
                        <button 
                            onClick={sendMessage} 
                            className={`p-3 rounded-xl transition-all duration-200 ${!input.trim() && !imageFile ? 'bg-gray-200 text-gray-400' : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'}`} 
                            disabled={isLoading || (!input.trim() && !imageFile)}
                        >
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </div>
                    {speechError && (
                        <p className="text-red-500 text-xs mt-2 px-2 animate-in slide-in-from-top-1">
                            {speechError.includes('network') ? 'Network error: Check connection.' : translations.chat.micError}
                        </p>
                    )}
                </div>
            </footer>
        </div>
    );
});
