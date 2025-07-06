import React from 'react';
import { FulfillingSquareSpinner } from 'react-epic-spinners';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <FulfillingSquareSpinner color="#3B82F6" size={50} />
    </div>
  );
};

export default LoadingSpinner;
