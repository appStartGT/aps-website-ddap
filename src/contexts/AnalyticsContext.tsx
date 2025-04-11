'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from '../hooks/useAnalytics';
import { useLanguage } from './LanguageContext';

// Create context
const AnalyticsContext = createContext<ReturnType<typeof useAnalytics> | undefined>(undefined);

// Analytics provider props
interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const analytics = useAnalytics();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useLanguage();

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Remove leading slash and convert to title case for screen name
      const formattedPath = pathname === '/' 
        ? 'Home' 
        : pathname
            .substring(1)
            .split('/')
            .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(' ');
            
      analytics.trackScreen(formattedPath);
      
      // Track page view with URL parameters for more detail
      analytics.trackEvent('page_view', {
        page_path: pathname,
        page_title: formattedPath,
        page_location: window.location.href,
        language: locale,
        ...(searchParams.size > 0 ? { 
          search_params: Object.fromEntries(searchParams.entries()) 
        } : {})
      });
    }
  }, [pathname, searchParams, analytics, locale]);

  // Set user properties on initial load
  useEffect(() => {
    // Get user device info
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : 'desktop';
    
    // Set default user properties
    analytics.setUserProperties({
      userLanguage: locale,
      userDevice: deviceType,
      userBrowser: getBrowserName(),
      referralSource: document.referrer || 'direct'
    });
  }, [analytics, locale]);

  // Helper function to detect browser
  const getBrowserName = (): string => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
    if (userAgent.indexOf("Trident") > -1) return "Internet Explorer";
    if (userAgent.indexOf("Edge") > -1) return "Edge";
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    
    return "Unknown";
  };

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook to use analytics in components
export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  
  return context;
} 