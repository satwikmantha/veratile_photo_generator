
import React, { useState, useCallback, useEffect } from 'react';
import { generateImage as generateImageFromApi } from './services/geminiService';
import type { HistoryItem, ImageStyle } from './types';
import { IMAGE_STYLES } from './constants';
import PromptForm from './components/PromptForm';
import ImagePreview from './components/ImagePreview';
import HistoryPanel from './components/HistoryPanel';
import { Header } from './components/Header';
import { FullScreenModal } from './components/FullScreenModal';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<ImageStyle>(IMAGE_STYLES[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('image-gen-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('image-gen-history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'isFavorite'>) => {
    setHistory(prev => [{ ...item, id: Date.now(), isFavorite: false }, ...prev].slice(0, 50)); // Keep last 50
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const fullPrompt = `${prompt}, ${style.promptSuffix}`;
      const imageUrl = await generateImageFromApi(fullPrompt);
      setGeneratedImage(imageUrl);
      addToHistory({ prompt, style });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, style]);

  const handleSelectHistory = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setStyle(item.style);
  };
  
  const handleToggleFavorite = (id: number) => {
    setHistory(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-brand-primary font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          <div className="lg:col-span-4 xl:col-span-3 space-y-8">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              style={style}
              setStyle={setStyle}
              isLoading={isLoading}
              onSubmit={handleGenerate}
            />
            <HistoryPanel
              history={history}
              onSelect={handleSelectHistory}
              onToggleFavorite={handleToggleFavorite}
              onClear={handleClearHistory}
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <ImagePreview
              image={generatedImage}
              isLoading={isLoading}
              error={error}
              prompt={prompt}
              onZoom={() => setSelectedImage(generatedImage)}
            />
          </div>
        </div>
      </main>
      {selectedImage && <FullScreenModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default App;
