"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Locale, defaultLocale, getMessages } from "../i18n";

// Define a proper recursive type instead of using 'any'
type RecursiveRecord = {
  [key: string]: string | RecursiveRecord;
};
type Messages = RecursiveRecord;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
  isLoading: boolean;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
  initialMessages?: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLocale = defaultLocale,
  initialMessages = {},
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Messages>(
    initialMessages as Messages
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Mark when component is mounted on client - split into two effects
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle localStorage in a separate effect with proper dependencies
  useEffect(() => {
    if (!isClient) return;

    // Only run on client side after mounted
    if (typeof window !== "undefined") {
      // Load saved locale from localStorage if available
      const savedLocale = localStorage.getItem("locale") as Locale | null;
      if (savedLocale && ["en", "es"].includes(savedLocale)) {
        if (savedLocale !== locale) {
          console.log("Setting locale from localStorage:", savedLocale);
          setLocaleState(savedLocale as Locale);
        }
      }
    }
  }, [isClient, locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setIsLoading(true);
    setLocaleState(newLocale);

    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  }, []);

  // Load messages for the current locale
  const loadMessages = useCallback(async (localeToLoad: Locale) => {
    try {
      setIsLoading(true);
      const newMessages = await getMessages(localeToLoad);
      setMessages(newMessages as Messages);
    } catch (error) {
      console.error(
        `Failed to load messages for locale ${localeToLoad}:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to load messages when locale changes
  useEffect(() => {
    if (isClient && locale) {
      loadMessages(locale);
    }
  }, [locale, isClient, loadMessages]);

  // Translation function
  const t = useCallback(
    (key: string): string => {
      // Split the key by dots to navigate nested objects
      const parts = key.split(".");
      let result: RecursiveRecord | string = messages;

      // Navigate through the nested structure
      for (const part of parts) {
        if (result && typeof result === "object" && part in result) {
          result = result[part];
        } else {
          // If the key doesn't exist, return the key as fallback
          return key;
        }
      }

      // If the result is a string, return it, otherwise return the key as fallback
      return typeof result === "string" ? result : key;
    },
    [messages]
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, messages, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
