'use client';
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f2]">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Envelope animation */}
          <div className="w-16 h-12 mx-auto border-2 border-[#006039] rounded-md overflow-hidden relative">
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div 
                className="w-0 h-0 border-t-[24px] border-r-[32px] border-l-[32px] border-solid border-t-[#006039] border-r-transparent border-l-transparent absolute top-0 left-0 z-10"
                style={{ animation: 'flapClose 2s infinite' }}
              ></div>
            </div>
            
            {/* Envelope letter */}
            <div 
              className="absolute top-1 left-1 right-1 bottom-1 bg-white z-0"
              style={{ animation: 'letterMove 2s infinite' }}
            ></div>
          </div>
          
          <div className="w-2 h-2 bg-[#006039] rounded-full absolute left-1/2 top-full mt-2 transform -translate-x-1/2"
            style={{ animation: 'dot1Pulse 2s infinite' }}>
          </div>
          
          <div className="w-2 h-2 bg-[#006039] rounded-full absolute left-1/2 top-full mt-6 transform -translate-x-1/2"
            style={{ animation: 'dot2Pulse 2s infinite' }}>
          </div>
          
          <div className="w-2 h-2 bg-[#006039] rounded-full absolute left-1/2 top-full mt-10 transform -translate-x-1/2"
            style={{ animation: 'dot3Pulse 2s infinite' }}>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 font-medium">Loading Contact Page...</p>
        
        <style jsx global>{`
          @keyframes flapClose {
            0%, 20% { transform: rotateX(0deg); transform-origin: top; }
            60%, 100% { transform: rotateX(180deg); transform-origin: top; }
          }
          
          @keyframes letterMove {
            0%, 40% { transform: translateY(0); }
            70%, 100% { transform: translateY(-30px); }
          }
          
          @keyframes dot1Pulse {
            0%, 20% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
            40% { opacity: 1; transform: translate(-50%, 0) scale(1.5); }
            60%, 100% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
          }
          
          @keyframes dot2Pulse {
            0%, 40% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
            60% { opacity: 1; transform: translate(-50%, 0) scale(1.5); }
            80%, 100% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
          }
          
          @keyframes dot3Pulse {
            0%, 60% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
            80% { opacity: 1; transform: translate(-50%, 0) scale(1.5); }
            100% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}