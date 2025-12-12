
import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = ai.models;

// Utility to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    // Function kept for type safety but effectively disabled/unused as per request
    return null;
};

export const streamChat = async ({
    prompt,
    image,
    language,
    useSearch,
    history,
}: {
    prompt: string;
    image: File | null;
    language: string;
    useSearch: boolean;
    history: Content[];
}) => {
    
    const contents: Content[] = [...history];
    const imageParts = image ? [await fileToGenerativePart(image)] : [];
    
    contents.push({
        role: 'user',
        parts: [...imageParts, { text: `Respond in ${language}. ${prompt}` }],
    });

    const systemInstruction = `You are Kisan Mitra, an intelligent agricultural advisor. 
    Your primary goal is to help farmers with agriculture, weather, markets, and government schemes.
    However, you are helpful and polite, so if the user asks about other topics, you may answer them as well.
    Always be concise, practical, and empathetic.`;

    const stream = await model.generateContentStream({
        model: 'gemini-2.5-flash',
        contents,
        config: {
            tools: useSearch ? [{ googleSearch: {} }] : [],
            systemInstruction: systemInstruction,
        },
    });

    return stream;
};

export interface ParsedNewsItem {
    category: 'market' | 'weather' | 'general';
    title: string;
    content: string;
    source?: string;
}

export const getAgriculturalNews = async (language: string): Promise<ParsedNewsItem[]> => {
    // Request ID ensures uniqueness to prevent caching and force fresh results
    const requestId = Math.floor(Math.random() * 1000000); 

    const prompt = `[Request ID: ${requestId}] You are an agricultural news bot.
    Task: Fetch latest data from Agmarknet (Prices) and Skymet (Weather).
    
    STRICT RULES:
    1. TOPICS: ONLY Market Rates (Mandi prices for crops) and Weather (Rain, Heat, Storm). NO government schemes. NO pest warnings.
    2. LANGUAGE: Respond ONLY in ${language}. Do NOT mix languages. 
       - If Hindi, use Hindi script.
       - If English, use English.
    3. FORMAT: 3 to 4 short bullet points. Text-only. No emojis. Total length under 400 characters.
    
    If real-time data is unavailable, provide general seasonal market rates and weather trends for India in ${language}.

    Example Output (${language}):
    - Wheat: ₹2400/q - MP (Up)
    - Cotton: ₹6000/q - Gujarat
    - Heavy rain forecast for Mumbai.
    
    Generate list now:`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });

        const text = response.text || "";
        const items: ParsedNewsItem[] = [];
        
        // Simple parsing for bullet points since format is now unstructured/lightweight
        const lines = text.split('\n');
        
        for (const line of lines) {
            // Remove bullet points, numbers, and trim
            const cleanLine = line.replace(/^[\-\*\•\d\.]+\s*/, '').trim();
            
            if (cleanLine.length < 5) continue; // Skip empty or garbage lines

            let category: 'market' | 'weather' | 'general' = 'general';
            const lower = cleanLine.toLowerCase();
            
            // Multilingual keyword detection for categories
            if (lower.includes('₹') || lower.includes('price') || lower.includes('rate') || lower.includes('bhav') || lower.includes('mandi') || lower.includes('भाव') || lower.includes('दर') || lower.includes('விலை') || lower.includes('ದರ') || lower.includes('ధర')) {
                category = 'market';
            } else if (lower.includes('rain') || lower.includes('weather') || lower.includes('storm') || lower.includes('monsoon') || lower.includes('mausam') || lower.includes('बारिश') || lower.includes('मौसम') || lower.includes('வானிலை') || lower.includes('ಮಳೆ') || lower.includes('వర్షం')) {
                category = 'weather';
            }

            // Generate a short title from the first few words for the card UI
            const words = cleanLine.split(' ');
            const title = words.length > 6 ? words.slice(0, 6).join(' ') + '...' : cleanLine;

            items.push({
                category,
                title: title, 
                content: cleanLine,
                source: 'Agri Update'
            });
        }
        
        // Return top 4 to keep it lightweight (user asked for 3-4)
        return items.slice(0, 4);

    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
