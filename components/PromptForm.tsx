
import React from 'react';
import type { ImageStyle } from '../types';
import { IMAGE_STYLES } from '../constants';
import { WandIcon } from './icons';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: ImageStyle;
  setStyle: (style: ImageStyle) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, style, setStyle, isLoading, onSubmit }) => {
  
  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStyle = IMAGE_STYLES.find(s => s.name === e.target.value);
    if (selectedStyle) {
      setStyle(selectedStyle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-brand-secondary rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-brand-text">Create Your Image</h2>
      
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-brand-text-muted mb-1">
          Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., A futuristic city at sunset, cyberpunk style"
          className="w-full h-32 p-2 bg-brand-tertiary border border-brand-primary rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none transition resize-none"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="style" className="block text-sm font-medium text-brand-text-muted mb-1">
          Style
        </label>
        <select
          id="style"
          value={style.name}
          onChange={handleStyleChange}
          className="w-full p-2 bg-brand-tertiary border border-brand-primary rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none transition"
          disabled={isLoading}
        >
          {IMAGE_STYLES.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="w-full flex justify-center items-center gap-2 bg-brand-accent text-white font-bold py-3 px-4 rounded-md hover:bg-brand-accent-hover disabled:bg-brand-tertiary disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <WandIcon className="w-5 h-5" />
            <span>Generate</span>
          </>
        )}
      </button>
      <p className="text-xs text-center text-brand-text-muted">Pro tip: Use Ctrl+Enter to generate.</p>
    </div>
  );
};

export default PromptForm;
