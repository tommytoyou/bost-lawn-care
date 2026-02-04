/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import defaultServices from '../data/services.json';
import defaultTestimonials from '../data/testimonials.json';
import defaultGallery from '../data/gallery.json';
import defaultSiteContent from '../data/siteContent.json';

const ContentContext = createContext();

/**
 * Provider that wraps the app and supplies editable site content.
 * Admin changes are persisted via localStorage and override JSON defaults.
 */
export function ContentProvider({ children }) {
  const [services, setServices] = useLocalStorage('bost_services', defaultServices);
  const [testimonials, setTestimonials] = useLocalStorage('bost_testimonials', defaultTestimonials);
  const [gallery, setGallery] = useLocalStorage('bost_gallery', defaultGallery);
  const [siteContent, setSiteContent] = useLocalStorage('bost_siteContent', defaultSiteContent);

  // One-time cache clear to fix stale placeholder data from previous builds
  useEffect(() => {
    localStorage.removeItem('bost_services');
    localStorage.removeItem('bost_testimonials');
    localStorage.removeItem('bost_gallery');
    localStorage.removeItem('bost_siteContent');
    setServices(defaultServices);
    setTestimonials(defaultTestimonials);
    setGallery(defaultGallery);
    setSiteContent(defaultSiteContent);
  }, []);

  const value = {
    services,
    setServices,
    testimonials,
    setTestimonials,
    gallery,
    setGallery,
    siteContent,
    setSiteContent,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

/** Hook to access site content from any component */
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
