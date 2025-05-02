'use client';
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f2]">
      <div className="text-center">
        <div className="flex justify-center space-x-3 mb-6">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-full bg-[#006039]"
              style={{ 
                animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite` 
              }}
            ></div>
          ))}
        </div>
        <p className="text-lg text-gray-600 font-medium">Loading Services...</p>
        
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    </div>
  );
}