
import React from 'react';
import { WandIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-secondary p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <WandIcon className="w-8 h-8 text-brand-accent" />
        <h1 className="text-2xl font-bold text-brand-text tracking-tight">AI Image Fusion</h1>
      </div>
    </header>
  );
};
