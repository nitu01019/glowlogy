/**
 * Layout Component
 * Non-sticky header layout with floating action buttons
 */

import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingButtons } from '../ui';

export const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change - instant, not smooth
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Action Buttons - WhatsApp, Phone Call & Request Callback */}
      <FloatingButtons />
    </div>
  );
};

export default Layout;
