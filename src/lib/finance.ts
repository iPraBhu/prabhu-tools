import { LoanCalculation, LoanResult, FormValidation, ValidationError } from '../types';

/**
 * Calculate monthly payment using the standard loan payment formula
 * M = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * 
 * @param principal - Loan amount
 * @param annualRate - Annual interest rate as percentage (e.g., 5 for 5%)
 * @param termYears - Loan term in years
 * @returns Monthly payment amount
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (principal <= 0 || termYears <= 0) {
    return 0;
  }

  // Handle zero interest rate case
  if (annualRate === 0) {
    return principal / (termYears * 12);
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  
  return principal * (numerator / denominator);
}

/**
 * Calculate total interest paid over the life of the loan
 */
export function calculateTotalInterest(
  monthlyPayment: number,
  termYears: number,
  principal: number
): number {
  const totalPaid = monthlyPayment * termYears * 12;
  return Math.max(0, totalPaid - principal);
}

/**
 * Calculate payoff time with extra monthly payments
 */
export function calculatePayoffTimeWithExtra(
  principal: number,
  annualRate: number,
  regularPayment: number,
  extraPayment: number = 0
): number {
  if (principal <= 0 || regularPayment <= 0) {
    return 0;
  }

  if (annualRate === 0) {
    return principal / (regularPayment + extraPayment);
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalPayment = regularPayment + extraPayment;
  
  // Ensure payment is greater than interest to avoid infinite loop
  const monthlyInterest = principal * monthlyRate;
  if (totalPayment <= monthlyInterest) {
    return Infinity;
  }

  let balance = principal;
  let months = 0;
  
  while (balance > 0.01 && months < 600) { // Cap at 50 years for safety
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(totalPayment - interestPayment, balance);
    balance -= principalPayment;
    months++;
  }
  
  return months;
}

/**
 * Complete loan calculation with all results
 */
export function calculateLoan(params: LoanCalculation): LoanResult {
  const { loanAmount, annualInterestRate, loanTermMonths, extraMonthlyPayment = 0 } = params;
  
  // Convert months to years for existing calculation functions
  const loanTermYears = loanTermMonths / 12;
  
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermYears);
  const totalInterest = calculateTotalInterest(monthlyPayment, loanTermYears, loanAmount);
  const totalPaid = monthlyPayment * loanTermMonths;
  const payoffTimeMonths = loanTermMonths;
  
  let payoffTimeSavings: number | undefined;
  
  if (extraMonthlyPayment > 0) {
    const payoffWithExtra = calculatePayoffTimeWithExtra(
      loanAmount,
      annualInterestRate,
      monthlyPayment,
      extraMonthlyPayment
    );
    payoffTimeSavings = payoffTimeMonths - payoffWithExtra;
  }
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    payoffTimeMonths,
    payoffTimeSavings: payoffTimeSavings ? Math.round(payoffTimeSavings * 100) / 100 : undefined,
  };
}

/**
 * Validate loan calculation inputs
 */
export function validateLoanInputs(params: Partial<LoanCalculation>): FormValidation {
  const errors: ValidationError[] = [];

  if (!params.loanAmount || params.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than $0' });
  } else if (params.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  if (params.annualInterestRate === undefined || params.annualInterestRate < 0) {
    errors.push({ field: 'annualInterestRate', message: 'Interest rate cannot be negative' });
  } else if (params.annualInterestRate > 50) {
    errors.push({ field: 'annualInterestRate', message: 'Interest rate cannot exceed 50%' });
  }

  if (!params.loanTermMonths || params.loanTermMonths <= 0) {
    errors.push({ field: 'loanTermMonths', message: 'Loan term must be greater than 0 months' });
  } else if (params.loanTermMonths > 600) {
    errors.push({ field: 'loanTermMonths', message: 'Loan term cannot exceed 600 months (50 years)' });
  }

  if (params.extraMonthlyPayment && params.extraMonthlyPayment < 0) {
    errors.push({ field: 'extraMonthlyPayment', message: 'Extra payment cannot be negative' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

/**
 * Convert months to years and months for display
 */
export function formatTimeperiod(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);
  
  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
}

/**
 * Local storage helpers for persisting form data
 */
export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}