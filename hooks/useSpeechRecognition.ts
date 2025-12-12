
import { useState, useEffect, useRef } from 'react';

// Interfaces for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = (onTranscriptChange: (transcript: string) => void) => {  
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      console.warn("Speech recognition not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if(finalTranscript) {
        onTranscriptChange(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorMessage = event.error;
      
      if (event.error === 'not-allowed') {
          errorMessage = 'Microphone access denied';
      } else if (event.error === 'network') {
          errorMessage = 'network'; // Keep it simple for UI to handle
      }
      
      setError(errorMessage);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Only restart if we didn't stop manually and there wasn't an error
      if (isListening && !error) {
           // Small delay to prevent rapid loops if something is wrong
           setTimeout(() => {
               if(isListening) recognition.start();
           }, 200);
      } else {
          setIsListening(false);
      }
    };
    
    recognitionRef.current = recognition;
  }, [isListening, onTranscriptChange, error]);

  const startListening = (lang: string) => {
    if (!window.isSecureContext) {
        setError("Speech recognition requires HTTPS.");
        return;
    }
    if (recognitionRef.current && !isListening) {
      setError(null);
      recognitionRef.current.lang = lang;
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const toggleListening = (lang: string) => {
    if (isListening) {
      stopListening();
    } else {
      startListening(lang);
    }
  };
  
  return {
    isListening,
    error,
    startListening,
    stopListening,
    toggleListening,
    hasRecognitionSupport: !!SpeechRecognitionAPI,
  };
};
