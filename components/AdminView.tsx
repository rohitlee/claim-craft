import React, { useState } from 'react';

interface AdminViewProps {
  onAddQuestion: (question: { title: string; description: string; originalClaim: string; novelty: string; inventiveStep: string; }, imageUrl: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onAddQuestion }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [originalClaim, setOriginalClaim] = useState('');
  const [novelty, setNovelty] = useState('');
  const [inventiveStep, setInventiveStep] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onAddQuestion({ title, description, originalClaim, novelty, inventiveStep }, imageUrl);

    setTitle('');
    setDescription('');
    setOriginalClaim('');
    setNovelty('');
    setInventiveStep('');
    setImageUrl('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-700 border-b pb-4 mb-8">Add New Question</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-slate-600 mb-2">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-2">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="originalClaim" className="block text-sm font-medium text-slate-600 mb-2">Original Claim</label>
          <textarea id="originalClaim" value={originalClaim} onChange={(e) => setOriginalClaim(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="novelty" className="block text-sm font-medium text-slate-600 mb-2">Novelty</label>
          <textarea id="novelty" value={novelty} onChange={(e) => setNovelty(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="inventiveStep" className="block text-sm font-medium text-slate-600 mb-2">Inventive Step</label>
          <textarea id="inventiveStep" value={inventiveStep} onChange={(e) => setInventiveStep(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-600 mb-2">Image URL (from PostImages.org)</label>
          <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AdminView;
