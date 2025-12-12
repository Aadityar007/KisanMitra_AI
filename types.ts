
import type { ComponentType } from 'react';

export enum ViewType {
  DASHBOARD = 'dashboard',
  CROP_ADVISORY = 'crop_advisory',
  MARKET_WEATHER = 'market_weather',
  GOV_CONNECT = 'gov_connect',
}

export interface Language {
  code: string;
  name: string;
}

export interface Source {
  uri: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string; sources?: Source[] }[];
  image?: string;
  isLoading?: boolean;
}

export interface NavItem {
  id: ViewType;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface ChatViewHandles {
  sendMessage: () => void;
}

export interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  navItems: NavItem[];
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  translations: Translations;
}

export interface Translations {
  appTitle: string;
  sidebar: {
    dashboard: string;
    cropAdvisory: string;
    marketWeather: string;
    govConnect: string;
    language: string;
  };
  dashboard: {
    welcome: string;
    subtitle: string;
    cardDesc: string;
  };
  chat: {
    thinking: string;
    sources: string;
    inputPlaceholder: string;
    startPrompt: string;
    error: string;
    micError: string;
    uploadImage: string;
  };
  gov: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      location: string;
      type: string;
      message: string;
      submit: string;
      success: string;
      successMsg: string;
      queryTypes: string[];
    };
    advisories: string;
    advisoriesSubtitle: string;
    demoAdvisories: { title: string; date: string; content: string }[];
  };
  cropAdvisory: {
    title: string;
    description: string;
    prompts: string[];
  };
  marketWeather: {
    title: string;
    description: string;
    loading: string;
    refresh: string;
    readMore: string;
    categories: {
        market: string;
        weather: string;
        general: string;
    };
    error: string;
  };
}
