
import React, { useState } from 'react';
import { DownloadIcon, CopyIcon, ZoomInIcon } from './icons';

interface ImagePreviewProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  onZoom: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, isLoading, error, prompt, onZoom }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleDownload = () => {
        if (!image) return;
        const link = document.createElement('a');
        link.href = image;
        const fileName = prompt.substring(0, 30).replace(/\s+/g, '_') || 'generated-image';
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(prompt).then(() => {
            setCopySuccess('Prompt copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-brand-text-muted">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-accent mb-4"></div>
                    <p className="text-lg">Generating your masterpiece...</p>
                    <p className="text-sm">This can take a moment.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
                    <p className="text-lg font-semibold">Oops! Something went wrong.</p>
                    <p className="text-center">{error}</p>
                </div>
            );
        }

        if (image) {
            return (
                <div className="relative group w-full h-full">
                    <img src={image} alt={prompt || 'Generated image'} className="object-contain w-full h-full rounded-lg" />
                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-lg">
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <button onClick={onZoom} className="p-3 bg-brand-secondary rounded-full text-white hover:bg-brand-accent transition-colors" title="Zoom In">
                                <ZoomInIcon className="w-6 h-6" />
                            </button>
                            <button onClick={handleDownload} className="p-3 bg-brand-secondary rounded-full text-white hover:bg-brand-accent transition-colors" title="Download Image">
                                <DownloadIcon className="w-6 h-6" />
                            </button>
                            <button onClick={handleCopyPrompt} className="p-3 bg-brand-secondary rounded-full text-white hover:bg-brand-accent transition-colors" title="Copy Prompt">
                                <CopyIcon className="w-6 h-6" />
                            </button>
                        </div>
                        {copySuccess && <div className="absolute bottom-4 bg-brand-tertiary text-white px-3 py-1 rounded-md text-sm">{copySuccess}</div>}
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-brand-text-muted">
                <p className="text-xl">Your generated image will appear here</p>
                <p>Enter a prompt and click "Generate" to start</p>
            </div>
        );
    };

    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg w-full aspect-square flex items-center justify-center p-4">
            {renderContent()}
        </div>
    );
};

export default ImagePreview;
