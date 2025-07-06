import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getColor = () => {
    if (normalizedScore >= 85) return 'text-green-500';
    if (normalizedScore >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTrackColor = () => {
    if (normalizedScore >= 85) return 'stroke-green-500';
    if (normalizedScore >= 60) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };
  
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background Circle */}
        <circle
          className="text-slate-200"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        {/* Progress Circle */}
        <circle
          className={getTrackColor()}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${getColor()}`}>
        <span className="text-4xl font-bold">{normalizedScore}</span>
        <span className="text-sm font-semibold -mt-1">/ 100</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
