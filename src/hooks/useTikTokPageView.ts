import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useTikTokPageView() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.page();
    }
  }, [location.pathname]);
}