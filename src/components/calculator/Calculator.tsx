import { useState, useCallback } from 'react';
import type { CalculatorState } from './types';
import { OPERATORS } from './types';
import Display from './Display';
import CalculatorButton from './CalculatorButton';
import { useCalculator } from './useCalculator';

/**
 * Main Calculator Component
 * React 19 with React Compiler optimizations
 * The compiler automatically memoizes components and hooks
 */
export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    currentInput: '0',
    operator: null,
    operand1: null,
    isNewInput: true,
    history: '',
  });

  const { handleNumber, handleOperator, handleEquals, handleFunction } = useCalculator(setState);

  const getOperatorVariant = useCallback((op: string) => {
    return state.operator === op && state.isNewInput ? 'operator-active' : 'operator';
  }, [state.operator, state.isNewInput]);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto shadow-2xl">
      
      <Display history={state.history} currentInput={state.currentInput} />

      <div className="grid grid-cols-4 gap-[1px] bg-gray-300 dark:bg-gray-600 flex-grow">
          {/* Row 1 */}
          <CalculatorButton onClick={() => handleFunction('AC')} variant="function">
            AC
          </CalculatorButton>
          <CalculatorButton onClick={() => handleFunction('+/-')} variant="function">
            ±
          </CalculatorButton>
          <CalculatorButton onClick={() => handleFunction('%')} variant="function">
            %
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => handleOperator(OPERATORS.DIVIDE)} 
            variant={getOperatorVariant(OPERATORS.DIVIDE) as 'operator' | 'operator-active'}
          >
            ÷
          </CalculatorButton>

          {/* Row 2 */}
          <CalculatorButton onClick={() => handleNumber('7')} variant="number">7</CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('8')} variant="number">8</CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('9')} variant="number">9</CalculatorButton>
          <CalculatorButton 
            onClick={() => handleOperator(OPERATORS.MULTIPLY)} 
            variant={getOperatorVariant(OPERATORS.MULTIPLY) as 'operator' | 'operator-active'}
          >
            ×
          </CalculatorButton>

          {/* Row 3 */}
          <CalculatorButton onClick={() => handleNumber('4')} variant="number">4</CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('5')} variant="number">5</CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('6')} variant="number">6</CalculatorButton>
          <CalculatorButton 
            onClick={() => handleOperator(OPERATORS.SUBTRACT)} 
            variant={getOperatorVariant(OPERATORS.SUBTRACT) as 'operator' | 'operator-active'}
          >
            −
          </CalculatorButton>

          {/* Row 4 */}
          <CalculatorButton onClick={() => handleNumber('1')} variant="number">1</CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('2')} variant="number">2</CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('3')} variant="number">3</CalculatorButton>
          <CalculatorButton 
            onClick={() => handleOperator(OPERATORS.ADD)} 
            variant={getOperatorVariant(OPERATORS.ADD) as 'operator' | 'operator-active'}
          >
            +
          </CalculatorButton>

          {/* Row 5 */}
          <CalculatorButton 
            onClick={() => handleNumber('0')} 
            variant="number"
            className="col-span-2"
          >
            0
          </CalculatorButton>
          <CalculatorButton onClick={() => handleNumber('.')} variant="number">
            ,
          </CalculatorButton>
          <CalculatorButton onClick={handleEquals} variant="equals">
            =
          </CalculatorButton>
        </div>
    </div>
  );
}
