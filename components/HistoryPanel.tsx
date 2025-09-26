
import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { StarIcon, TrashIcon } from './icons';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onToggleFavorite: (id: number) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onToggleFavorite, onClear }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredHistory = showFavorites ? history.filter(item => item.isFavorite) : history;

  return (
    <div className="bg-brand-secondary rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-brand-text">History</h2>
        <button onClick={onClear} disabled={history.length === 0} className="p-1 text-brand-text-muted hover:text-red-400 disabled:opacity-50 transition" title="Clear History">
            <TrashIcon className="w-5 h-5"/>
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => setShowFavorites(false)}
          className={`px-3 py-1 text-sm rounded-full transition ${!showFavorites ? 'bg-brand-accent text-white' : 'bg-brand-tertiary text-brand-text-muted'}`}
        >
          All
        </button>
        <button 
          onClick={() => setShowFavorites(true)}
          className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full transition ${showFavorites ? 'bg-brand-accent text-white' : 'bg-brand-tertiary text-brand-text-muted'}`}
        >
          <StarIcon className="w-4 h-4" isFilled={showFavorites} /> Favorites
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between p-3 bg-brand-tertiary rounded-md hover:bg-brand-primary cursor-pointer transition"
              onClick={() => onSelect(item)}
            >
              <div className="flex-1 overflow-hidden">
                <p className="text-sm truncate text-brand-text">{item.prompt}</p>
                <p className="text-xs text-brand-text-muted">{item.style.name}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                className={`ml-2 p-1 rounded-full transition-colors ${item.isFavorite ? 'text-yellow-400 hover:text-yellow-300' : 'text-brand-text-muted hover:text-yellow-400'}`}
                title="Toggle Favorite"
              >
                <StarIcon className="w-5 h-5" isFilled={item.isFavorite} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-brand-text-muted py-4">
            {showFavorites ? 'No favorite prompts yet.' : 'Your prompt history is empty.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
