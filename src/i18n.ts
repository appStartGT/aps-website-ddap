// Supported languages in the app
export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// This is used internally by the app to load messages
export async function getMessages(locale: Locale) {
  return (await import(`./messages/${locale}.json`)).default;
} 