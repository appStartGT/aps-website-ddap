import { useEffect, useState } from 'react';
import { Analytics, logEvent, setCurrentScreen, setUserId, setUserProperties } from 'firebase/analytics';
import { initializeAnalytics } from '../utils/firebase';

// Define common event names for consistency
export const AnalyticsEvents = {
  // Page Views
  VIEW_HOME_PAGE: 'view_home_page',
  VIEW_SERVICES_PAGE: 'view_services_page',
  VIEW_GALLERY_PAGE: 'view_gallery_page',
  VIEW_ABOUT_PAGE: 'view_about_page',
  VIEW_CONTACT_PAGE: 'view_contact_page',
  
  // Contact Actions
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',
  CONTACT_PHONE_CALL: 'contact_phone_call',
  CONTACT_EMAIL_CLICK: 'contact_email_click',
  CONTACT_WHATSAPP_CLICK: 'contact_whatsapp_click',
  
  // Service Interactions
  SERVICE_CLICK: 'service_click',
  SERVICE_DETAILS_VIEW: 'service_details_view',
  
  // Gallery Interactions
  GALLERY_IMAGE_VIEW: 'gallery_image_view',
  GALLERY_SLIDE_CHANGE: 'gallery_slide_change',
  GALLERY_ZOOM: 'gallery_zoom',
  
  // Quote/Estimate
  REQUEST_QUOTE: 'request_quote',
  
  // Testimonials
  VIEW_TESTIMONIAL: 'view_testimonial',
  
  // Navigation
  NAVIGATION_CLICK: 'navigation_click',
  
  // Language Selection
  LANGUAGE_CHANGE: 'language_change',
} as const;

// User properties type as Record<string, string | number | boolean>
// to match Firebase's CustomParams requirement
type UserProperties = Record<string, string | number | boolean>;

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const setupAnalytics = async () => {
      try {
        const analyticsInstance = await initializeAnalytics();
        setAnalytics(analyticsInstance);
      } catch (error) {
        console.error('Error initializing analytics:', error);
      }
    };

    setupAnalytics();
  }, []);

  // Track custom events
  const trackEvent = (
    eventName: string, 
    eventParams?: Record<string, string | number | boolean | object>
  ) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  // Set current screen for page views
  const trackScreen = (screenName: string) => {
    if (analytics) {
      setCurrentScreen(analytics, screenName);
      // Also log as an event for more detailed reporting
      logEvent(analytics, `view_${screenName.toLowerCase().replace(/ /g, '_')}_screen`);
    }
  };

  // Set user ID (for authenticated users)
  const setAnalyticsUserId = (id: string | null) => {
    if (analytics && id) {
      setUserId(analytics, id);
    }
  };

  // Set user properties - now with proper typing
  const setAnalyticsUserProperties = (properties: UserProperties) => {
    if (analytics) {
      setUserProperties(analytics, properties);
    }
  };

  return {
    trackEvent,
    trackScreen,
    setUserId: setAnalyticsUserId,
    setUserProperties: setAnalyticsUserProperties,
    AnalyticsEvents,
  };
} 