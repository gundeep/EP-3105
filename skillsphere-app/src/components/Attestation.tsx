'use client';

import { useState } from 'react';

interface AttestationProps {
  onComplete: () => void;
}

export function Attestation({ onComplete }: AttestationProps) {
  const [isAttesting, setIsAttesting] = useState(false);

  const handleAttest = async () => {
    setIsAttesting(true);
    try {
      // TODO: Implement actual attestation logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      onComplete();
    } catch (error) {
      console.error('Attestation failed:', error);
    } finally {
      setIsAttesting(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAttest}
        disabled={isAttesting}
        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 text-lg">
          {isAttesting ? 'Attesting...' : 'Complete Attestation'}
        </span>
      </button>
    </div>
  );
} 