import { memo } from 'react';
import { formatForDisplay } from './utils';

interface DisplayProps {
  history: string;
  currentInput: string;
}

/**
 * Display Component
 * React 19: memo is optional with compiler, but we use it for explicit optimization
 */
const Display = memo(function Display({ history, currentInput }: DisplayProps) {
  return (
    <div className="flex flex-col-reverse justify-end p-4 flex-shrink-0">
      <div 
        className="w-full text-right font-light text-4xl text-gray-800 dark:text-gray-200 px-6 pb-2 hide-scrollbar overflow-x-auto whitespace-nowrap"
      >
        {formatForDisplay(currentInput)}
      </div>
      <div className="w-full text-right text-lg text-gray-500 dark:text-gray-400 px-6 h-7 truncate">
        {history}
      </div>
    </div>
  );
});

export default Display;
