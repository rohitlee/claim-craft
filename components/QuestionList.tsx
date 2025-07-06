import React from 'react';
import { PracticeQuestion } from '../types';

interface QuestionListProps {
  questions: PracticeQuestion[];
  onSelect: (question: PracticeQuestion) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 border-b pb-2">Practice Scenarios</h2>
      <p className="text-slate-600">Select a scenario below to start drafting your patent claim.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((question, index) => (
          <div
            key={question.id}
            onClick={() => onSelect(question)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{`${index + 1}. ${question.title}`}</h3>
            <p className="text-slate-600 line-clamp-3">{question.description}</p>
            <div className="mt-4 text-right">
              <span className="text-blue-600 font-semibold">Start Practice &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;