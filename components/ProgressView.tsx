import React from 'react';
import { PracticeQuestion, UserProgress } from '../types';
import ScoreGauge from './ScoreGauge';

interface ProgressViewProps {
  questions: PracticeQuestion[];
  userProgress: UserProgress;
  onViewFeedback: (feedback: AIFeedback) => void;
}

const ProgressView: React.FC<ProgressViewProps> = ({ questions, userProgress, onViewFeedback }) => {
  const attemptedQuestionIds = Object.keys(userProgress);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-700 border-b pb-2 mb-6">Your Progress</h2>
      {attemptedQuestionIds.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md border">
          <p className="text-slate-600 text-lg">You haven't attempted any questions yet.</p>
          <p className="text-slate-500 mt-2">Go back to the list and start practicing to see your progress here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions
            .filter(q => attemptedQuestionIds.includes(q.id))
            .map((question) => {
              const progress = userProgress[question.id];
              if (!progress || !progress.feedback) return null; // Ensure feedback exists

              return (
                <div
                  key={question.id}
                  onClick={() => onViewFeedback(progress.feedback)}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-slate-800">{question.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{question.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ScoreGauge score={progress.score} />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ProgressView;