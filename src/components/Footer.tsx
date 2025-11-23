'use client';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 p-4 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side - Copyright and Company Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative flex-shrink-0">
              <Image
                src="/assets/hexagon-logo.png"
                alt="PartPulse Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="font-medium">PartPulse</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <span>© {currentYear} Trane Thermo King Pty LTD</span>
        </div>

        {/* Right side - Partner Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Powered by</span>
          <div className="w-16 h-6 sm:w-20 sm:h-8 relative flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Trane Thermo King"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
