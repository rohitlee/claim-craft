import React from 'react';
import { AIFeedback } from '../types';
import ScoreGauge from './ScoreGauge';

interface FeedbackViewProps {
  feedback: AIFeedback;
  onBack: () => void;
}

const FeedbackCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <div className="flex items-center mb-3">
            <div className="mr-3 text-blue-600">{icon}</div>
            <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        </div>
        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{children}</p>
    </div>
);

const FeedbackView: React.FC<FeedbackViewProps> = ({ feedback, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl font-extrabold text-slate-800">Analysis Complete</h2>
          <p className="text-slate-500 mt-2 text-lg">Here is the detailed feedback on your drafted claim.</p>
        </div>
        <ScoreGauge score={feedback.score} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FeedbackCard title="Clarity & Structure" icon={<PencilIcon />}>
            {feedback.feedback.clarity}
        </FeedbackCard>
        <FeedbackCard title="Novelty" icon={<LightBulbIcon />}>
            {feedback.feedback.novelty}
        </FeedbackCard>
        <FeedbackCard title="Inventive Step" icon={<SparklesIcon />}>
            {feedback.feedback.inventiveStep}
        </FeedbackCard>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
                <div className="mr-3 text-blue-700"><CheckCircleIcon /></div>
                <h3 className="text-xl font-semibold text-blue-800">Overall Suggestions</h3>
            </div>
            <p className="text-blue-900 whitespace-pre-wrap leading-relaxed">{feedback.feedback.overall}</p>
        </div>
      </div>
      
      <div className="text-center mt-10">
        <button
          onClick={onBack}
          className="py-2 px-8 bg-slate-600 text-white font-semibold rounded-md hover:bg-slate-700 transition-colors"
        >
          Back to Question List
        </button>
      </div>
    </div>
  );
};

// SVG Icon Components
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);
const LightBulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export default FeedbackView;
