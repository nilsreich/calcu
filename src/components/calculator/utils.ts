import type { Operator } from './types';
import { DISPLAY_OPERATORS } from './types';
import { evaluate, format } from 'mathjs';

export const calculate = (op1: number, op2: number, operator: Operator): number | 'Error' => {
  if (!operator) return op2;
  
  try {
    // Use mathjs to avoid floating point errors
    let expression = '';
    
    switch (operator) {
      case '+':
        expression = `${op1} + ${op2}`;
        break;
      case '-':
        expression = `${op1} - ${op2}`;
        break;
      case '*':
        expression = `${op1} * ${op2}`;
        break;
      case '/':
        if (op2 === 0) return 'Error';
        expression = `${op1} / ${op2}`;
        break;
      default:
        return op2;
    }
    
    const result = evaluate(expression);
    
    // Format the result to remove floating point errors
    // Use precision of 10 decimal places
    return parseFloat(format(result, { precision: 14 }));
  } catch (error) {
    console.error('Calculation error:', error);
    return 'Error';
  }
};

export const formatForDisplay = (numString: string): string => {
  if (numString === 'Error') return 'Error';
  
  const [integerPart, decimalPart] = numString.split('.');
  
  const formattedInteger = parseFloat(integerPart || '0').toLocaleString('de-DE', {
    maximumFractionDigits: 0,
  });

  if (decimalPart !== undefined) {
    return `${formattedInteger},${decimalPart}`;
  }
  
  if (numString.endsWith('.')) {
    return `${formattedInteger},`;
  }

  return formattedInteger;
};

export const getDisplayOperator = (operator: Operator): string => {
  return operator ? DISPLAY_OPERATORS[operator] : '';
};
