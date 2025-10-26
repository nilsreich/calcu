import { useState, useCallback, useMemo } from 'react';
import type { CalculatorState } from './types';

/**
 * React 19 optimized hook for calculator state management
 * Uses React Compiler optimizations automatically
 */
export const useCalculatorState = () => {
  const [state, setState] = useState<CalculatorState>({
    currentInput: '0',
    operator: null,
    operand1: null,
    isNewInput: true,
    history: '',
  });

  // React 19: Compiler will automatically memoize these
  const updateState = useCallback((updater: (prev: CalculatorState) => CalculatorState) => {
    setState(updater);
  }, []);

  const resetState = useCallback(() => {
    setState({
      currentInput: '0',
      operator: null,
      operand1: null,
      isNewInput: true,
      history: '',
    });
  }, []);

  // React 19: useMemo is often not needed with the compiler, but we keep it for clarity
  const isError = useMemo(() => state.currentInput === 'Error', [state.currentInput]);
  
  return {
    state,
    updateState,
    resetState,
    isError,
  };
};
