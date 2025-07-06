import React, { useState, useRef } from 'react';
import { PracticeQuestion } from '../types';

interface PracticeViewProps {
  question: PracticeQuestion;
  onSubmit: (userClaim: string) => void;
}

const PracticeView: React.FC<PracticeViewProps> = ({ question, onSubmit }) => {
  const [claimText, setClaimText] = useState('');
  const [showImage, setShowImage] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimText.trim()) {
      onSubmit(claimText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      const newText = claimText.substring(0, start) + '\t' + claimText.substring(end);
      setClaimText(newText);
      
      // The state update is async. We use a ref and a timeout
      // to ensure the cursor is updated after the component re-renders.
      setTimeout(() => {
        if (textAreaRef.current) {
            textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = start + 1;
        }
      }, 0);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Pane: Question Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{question.title}</h2>
        
        <div className="space-y-4 text-slate-700">
          <div>
            <h3 className="font-semibold text-lg text-slate-700 mb-1">Invention Description:</h3>
            <p className="leading-relaxed">{question.description}</p>
          </div>
        </div>
        <div className="mt-4">
          {(question.imageUrls && question.imageUrls.length > 0) && (
            <button
              onClick={() => setShowImage(!showImage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold">
              {showImage ? 'Hide Figure' : 'View Figure'}
            </button>
          )}
        </div>
        {showImage && question.imageUrls && question.imageUrls.length > 0 && (
          <div className="mt-4">
            {question.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Question image ${index + 1}`} className="max-w-full h-auto rounded-md mb-2" />
            ))}
          </div>
        )}
      </div>

      {/* Right Pane: Claim Editor */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Draft Your Claim</h2>
          <textarea
            ref={textAreaRef}
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="1. A device comprising..."
            className="flex-grow w-full p-4 border border-slate-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 text-base font-mono bg-slate-50"
            rows={15}
          />
          <button
            type="submit"
            disabled={!claimText.trim()}
            className="mt-4 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit for AI Analysis
          </button>
        </form>
      </div>
    </div>
  );
};

export default PracticeView;
