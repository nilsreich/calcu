import { useCallback } from 'react';
import type { Operator, CalculatorState } from './types';
import { calculate, formatForDisplay, getDisplayOperator } from './utils';

interface UseCalculatorReturn {
  state: CalculatorState;
  handleNumber: (num: string) => void;
  handleOperator: (op: Operator) => void;
  handleEquals: () => void;
  handleFunction: (func: 'AC' | '+/-' | '%') => void;
}

export const useCalculator = (
  setState: React.Dispatch<React.SetStateAction<CalculatorState>>
): Omit<UseCalculatorReturn, 'state'> => {
  
  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      if (num === '.' && prev.currentInput.includes('.')) return prev;

      if (prev.isNewInput) {
        return { ...prev, currentInput: num, isNewInput: false };
      }

      return {
        ...prev,
        currentInput: prev.currentInput === '0' ? num : prev.currentInput + num,
      };
    });
  }, [setState]);

  const handleOperator = useCallback((op: Operator) => {
    setState((prev) => {
      const currentVal = parseFloat(prev.currentInput);
      let newOperand1 = prev.operand1;

      if (prev.operand1 === null) {
        newOperand1 = currentVal;
      } else if (!prev.isNewInput) {
        const result = calculate(prev.operand1, currentVal, prev.operator);
        if (result === 'Error') {
          return {
            currentInput: 'Error',
            operator: null,
            operand1: null,
            isNewInput: true,
            history: '',
          };
        }
        newOperand1 = result;
        prev.currentInput = String(result);
      }

      return {
        ...prev,
        currentInput: prev.currentInput,
        operand1: newOperand1,
        operator: op,
        isNewInput: true,
        history: `${formatForDisplay(String(newOperand1))} ${getDisplayOperator(op)}`,
      };
    });
  }, [setState]);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.operand1 === null || prev.operator === null || prev.isNewInput) {
        return prev;
      }

      const operand2 = parseFloat(prev.currentInput);
      const result = calculate(prev.operand1, operand2, prev.operator);

      return {
        currentInput: result === 'Error' ? 'Error' : String(result),
        operator: null,
        operand1: null,
        isNewInput: true,
        history: `${formatForDisplay(String(prev.operand1))} ${getDisplayOperator(prev.operator)} ${formatForDisplay(String(operand2))} =`,
      };
    });
  }, [setState]);

  const handleFunction = useCallback((func: 'AC' | '+/-' | '%') => {
    setState((prev) => {
      switch (func) {
        case 'AC':
          return {
            currentInput: '0',
            operator: null,
            operand1: null,
            isNewInput: true,
            history: '',
          };

        case '+/-': {
          const toggledVal = parseFloat(prev.currentInput) * -1;
          const newState = { ...prev, currentInput: String(toggledVal) };
          
          if (prev.isNewInput && prev.operand1 !== null) {
            newState.operand1 = toggledVal;
            newState.history = `${formatForDisplay(String(toggledVal))} ${getDisplayOperator(prev.operator)}`;
          }
          
          return newState;
        }

        case '%': {
          const percentVal = parseFloat(prev.currentInput) / 100;
          const newState = { ...prev, currentInput: String(percentVal), isNewInput: true };
          
          if (prev.isNewInput && prev.operand1 !== null) {
            newState.operand1 = percentVal;
            newState.history = `${formatForDisplay(String(percentVal))} ${getDisplayOperator(prev.operator)}`;
          }
          
          return newState;
        }

        default:
          return prev;
      }
    });
  }, [setState]);

  return {
    handleNumber,
    handleOperator,
    handleEquals,
    handleFunction,
  };
};
