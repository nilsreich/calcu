import { memo } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { useRipple } from './useRipple';

export type ButtonVariant = 'number' | 'function' | 'operator' | 'operator-active' | 'equals';

interface CalculatorButtonProps {
  onClick: () => void;
  variant: ButtonVariant;
  className?: string;
  children: ReactNode;
}

const buttonStyles: Record<ButtonVariant, string> = {
  number: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
  function: 'bg-gray-200 dark:bg-gray-800 text-blue-500 dark:text-blue-400',
  operator: 'bg-gray-200 dark:bg-gray-800 text-blue-500 dark:text-blue-400',
  'operator-active': 'bg-gray-200 dark:bg-gray-800 text-blue-500 dark:text-blue-400',
  equals: 'bg-blue-500 dark:bg-blue-600 text-white',
};

const rippleColors: Record<ButtonVariant, string> = {
  number: 'rgba(0, 0, 0, 0.1)',
  function: 'rgba(59, 130, 246, 0.3)',
  operator: 'rgba(59, 130, 246, 0.3)',
  'operator-active': 'rgba(59, 130, 246, 0.3)',
  equals: 'rgba(255, 255, 255, 0.4)',
};

/**
 * CalculatorButton Component
 * React 19: memo optimization + automatic compiler memoization
 */
const CalculatorButton = memo(function CalculatorButton({ 
  onClick, 
  variant, 
  className = '', 
  children 
}: CalculatorButtonProps) {
  const createRipple = useRipple(rippleColors[variant]);
  
  const baseClasses = 
    "relative overflow-hidden flex justify-center items-center text-3xl font-normal p-4 transition-all duration-100 h-full min-h-16";
  
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`${baseClasses} ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
});

export default CalculatorButton;
