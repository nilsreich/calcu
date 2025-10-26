export type Operator = '+' | '-' | '*' | '/' | null;
export type CalculatorFunction = 'AC' | '+/-' | '%';

export interface CalculatorState {
  currentInput: string;
  operator: Operator;
  operand1: number | null;
  isNewInput: boolean;
  history: string;
}

export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
} as const;

export const DISPLAY_OPERATORS = {
  [OPERATORS.MULTIPLY]: '×',
  [OPERATORS.DIVIDE]: '÷',
  [OPERATORS.ADD]: '+',
  [OPERATORS.SUBTRACT]: '−',
} as const;
