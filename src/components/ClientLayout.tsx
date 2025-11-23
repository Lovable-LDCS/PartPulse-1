'use client';

import { usePreview } from '@/contexts/PreviewContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { mode } = usePreview();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Determine if we should show mobile layout
  const isMobileView = mode === 'mobile';
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {isMobileView && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          ${isMobileView ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300' : ''}
          ${isMobileView && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        `}>
          <Sidebar />
        </div>
        
        {/* Mobile menu button */}
        {isMobileView && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed bottom-4 left-4 z-30 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        {/* Main content */}
        <main className={`
          flex-1 overflow-y-auto bg-gray-50 flex flex-col
          ${isMobileView ? 'w-full' : ''}
        `}>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
