
import React, { useEffect } from 'react';

interface FullScreenModalProps {
  image: string;
  onClose: () => void;
}

export const FullScreenModal: React.FC<FullScreenModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
      <button 
        className="absolute top-4 right-4 text-white text-4xl hover:text-brand-text-muted transition"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="max-w-screen-lg max-h-screen-lg" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Full screen preview" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"/>
      </div>
    </div>
  );
};
