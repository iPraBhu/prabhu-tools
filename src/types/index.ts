// Finance calculation types
export interface LoanCalculation {
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
  extraMonthlyPayment?: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  payoffTimeMonths: number;
  payoffTimeSavings?: number; // months saved with extra payment
}

// Tool types
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: 'finance' | 'converter' | 'utility';
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Navigation types
export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}