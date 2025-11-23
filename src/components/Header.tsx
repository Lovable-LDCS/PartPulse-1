'use client';

import { usePreview } from '@/contexts/PreviewContext';
import { useRole } from '@/contexts/RoleContext';
import { Monitor, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const { mode, setMode } = usePreview();
  const { role, setRole } = useRole();
  const [pulseGifError, setPulseGifError] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* PartPulse Hexagon Logo */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0">
          <Image
            src="/assets/hexagon-logo.png"
            alt="PartPulse - Spare Parts Distribution Management Logo"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">PartPulse</h1>
          {/* Pulse animation - shows GIF if available, fallback to SVG */}
          {!pulseGifError ? (
            <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex-shrink-0">
              <Image
                src="/assets/pulse.gif"
                alt="Pulse animation"
                width={32}
                height={32}
                className="object-contain"
                unoptimized
                onError={() => setPulseGifError(true)}
              />
            </div>
          ) : (
            <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex-shrink-0">
              <Image
                src="/assets/pulse.svg"
                alt="Pulse animation"
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            </div>
          )}
        </div>
        {/* Trane Logo - Partner Branding */}
        <div className="w-20 h-8 sm:w-24 sm:h-10 relative flex-shrink-0 ml-2 sm:ml-4">
          <Image
            src="/assets/logo.png"
            alt="Trane Thermo King - Partner Logo"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
        {/* Preview Mode Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1">
          <span className="text-xs sm:text-sm font-medium text-gray-600 px-1 sm:px-2 hidden sm:inline">Preview:</span>
          <button
            onClick={() => setMode('desktop')}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded ${
              mode === 'desktop' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Desktop preview mode"
          >
            <Monitor size={16} />
            <span className="text-xs sm:text-sm hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setMode('mobile')}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded ${
              mode === 'mobile' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Mobile preview mode"
          >
            <Smartphone size={16} />
            <span className="text-xs sm:text-sm hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Role Selector for Testing */}
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1">
          <span className="text-xs sm:text-sm font-medium text-gray-600 px-1 sm:px-2 hidden sm:inline">Role:</span>
          <button
            onClick={() => setRole('Admin')}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
              role === 'Admin' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole('Technician')}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
              role === 'Technician' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Technician
          </button>
        </div>
      </div>
    </header>
  );
}
