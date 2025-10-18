import { useState, useEffect } from 'react';
import { 
  LoanCalculation, 
  LoanResult, 
  ValidationError,
} from '../types';
import {
  calculateLoan,
  validateLoanInputs,
  formatCurrency,
  formatTimeperiod,
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../lib/finance';

const STORAGE_KEY = 'loan-calculator-data';

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  loanAmount: string;
  annualInterestRate: string;
  loanTermMonths: string; // Changed from Years to Months
  extraMonthlyPayment: string;
}

export default function MonthlyPaymentCalculator() {
  const [formData, setFormData] = useState<FormData>(() => 
    loadFromLocalStorage(STORAGE_KEY, {
      loanAmount: '',
      annualInterestRate: '',
      loanTermMonths: '', // Updated default field
      extraMonthlyPayment: '',
    })
  );
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<LoanResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isTermInMonths, setIsTermInMonths] = useState(true); // State to toggle between months and years

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEY, formData);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const convertFormData = (): LoanCalculation | null => {
    const loanAmount = parseFloat(formData.loanAmount) || 0;
    const annualInterestRate = parseFloat(formData.annualInterestRate) || 0;
    const loanTermInput = parseFloat(formData.loanTermMonths) || 0;
    const extraMonthlyPayment = parseFloat(formData.extraMonthlyPayment) || 0;

    // Convert to months if the input is in years
    const loanTermMonths = isTermInMonths ? loanTermInput : loanTermInput * 12;

    // Ensure all values are valid numbers
    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTermMonths) || isNaN(extraMonthlyPayment)) {
      return null;
    }

    return {
      loanAmount,
      annualInterestRate,
      loanTermMonths,
      extraMonthlyPayment,
    };
  };

  const handleCalculate = () => {
    const calculationData = convertFormData();

    if (!calculationData) {
      return;
    }

    setIsCalculating(true);
    
    // Validate inputs
    const validation = validateLoanInputs(calculationData);
    
    if (!validation.isValid) {
      const errorMap: FormErrors = {};
      validation.errors.forEach((error: ValidationError) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setResult(null);
      setIsCalculating(false);
      return;
    }

    // Clear errors and calculate
    setErrors({});
    
    // Add a small delay to show loading state
    setTimeout(() => {
      try {
        const calculationResult = calculateLoan(calculationData);
        setResult(calculationResult);
      } catch (error) {
        console.error('Calculation error:', error);
        setErrors({ general: 'An error occurred during calculation. Please check your inputs.' });
      } finally {
        setIsCalculating(false);
      }
    }, 100);
  };

  const handleReset = () => {
    const emptyFormData: FormData = {
      loanAmount: '',
      annualInterestRate: '',
      loanTermMonths: '',
      extraMonthlyPayment: '',
    };
    setFormData(emptyFormData);
    setErrors({});
    setResult(null);
    saveToLocalStorage(STORAGE_KEY, emptyFormData);
  };

  const toggleTermUnit = () => {
    const currentValue = parseFloat(formData.loanTermMonths) || 0;
    
    setFormData((prev) => ({
      ...prev,
      loanTermMonths: isTermInMonths
        ? (currentValue / 12).toString() // Convert months to years
        : (currentValue * 12).toString(), // Convert years to months
    }));
    
    setIsTermInMonths((prev) => !prev);
  };

  const isFormValid = () => {
    const data = convertFormData();
    if (!data) return false;
    return data.loanAmount > 0 && data.annualInterestRate >= 0 && data.loanTermMonths > 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
          Free Monthly Loan Payment Calculator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 leading-relaxed">
          Calculate monthly mortgage payments, auto loan payments, and personal loan costs. 
          Discover how extra payments can save thousands in interest and reduce your loan term by years.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Loan Details
          </h2>
          
          <div className="space-y-6">
            {/* Loan Amount */}
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                id="loanAmount"
                value={formData.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                className={`input-field ${errors.loanAmount ? 'input-error' : ''}`}
                placeholder="250,000"
                min="1"
                step="1000"
                inputMode="numeric"
                aria-describedby={errors.loanAmount ? 'loanAmount-error' : undefined}
              />
              {errors.loanAmount && (
                <p id="loanAmount-error" className="error-text" role="alert">
                  {errors.loanAmount}
                </p>
              )}
            </div>

            {/* Annual Interest Rate */}
            <div>
              <label htmlFor="annualInterestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                id="annualInterestRate"
                value={formData.annualInterestRate}
                onChange={(e) => handleInputChange('annualInterestRate', e.target.value)}
                className={`input-field ${errors.annualInterestRate ? 'input-error' : ''}`}
                placeholder="4.5"
                min="0"
                max="50"
                step="0.01"
                inputMode="decimal"
                aria-describedby={errors.annualInterestRate ? 'annualInterestRate-error' : undefined}
              />
              {errors.annualInterestRate && (
                <p id="annualInterestRate-error" className="error-text" role="alert">
                  {errors.annualInterestRate}
                </p>
              )}
            </div>

            {/* Loan Term */}
            <div>
              <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loan Term ({isTermInMonths ? 'Months' : 'Years'})
              </label>
              <input
                type="number"
                id="loanTerm"
                value={formData.loanTermMonths}
                onChange={(e) => handleInputChange('loanTermMonths', e.target.value)}
                className={`input-field ${errors.loanTermMonths ? 'input-error' : ''}`}
                placeholder={isTermInMonths ? "360" : "30"} // Default to months
                min="1"
                max={isTermInMonths ? 600 : 50} // Adjust range based on unit
                step="1"
                inputMode="numeric"
                aria-describedby={errors.loanTermMonths ? 'loanTermMonths-error' : undefined}
              />
              <button
                type="button"
                onClick={toggleTermUnit}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-sm font-medium transition-colors duration-200"
              >
                Switch to {isTermInMonths ? 'Years' : 'Months'}
              </button>
              {errors.loanTermMonths && (
                <p id="loanTermMonths-error" className="error-text" role="alert">
                  {errors.loanTermMonths}
                </p>
              )}
            </div>

            {/* Extra Monthly Payment */}
            <div>
              <label htmlFor="extraMonthlyPayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Extra Monthly Payment ($) <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
              </label>
              <input
                type="number"
                id="extraMonthlyPayment"
                value={formData.extraMonthlyPayment}
                onChange={(e) => handleInputChange('extraMonthlyPayment', e.target.value)}
                className={`input-field ${errors.extraMonthlyPayment ? 'input-error' : ''}`}
                placeholder="200"
                min="0"
                step="50"
                inputMode="numeric"
                aria-describedby={errors.extraMonthlyPayment ? 'extraMonthlyPayment-error' : undefined}
              />
              {errors.extraMonthlyPayment && (
                <p id="extraMonthlyPayment-error" className="error-text" role="alert">
                  {errors.extraMonthlyPayment}
                </p>
              )}
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium" role="alert">
                {errors.general}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={handleCalculate}
              disabled={!isFormValid() || isCalculating}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] text-sm sm:text-base"
              aria-label="Calculate monthly payment"
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                'Calculate'
              )}
            </button>
            <button
              onClick={handleReset}
              className="btn-secondary flex-1 min-h-[48px] text-sm sm:text-base"
              aria-label="Reset all fields"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Calculation Results
          </h2>
          
          {result ? (
            <div className="space-y-6">
              {/* Monthly Payment */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Monthly Payment
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(result.monthlyPayment)}
                </p>
              </div>

              {/* Total Interest and Total Paid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Interest
                  </h4>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Paid
                  </h4>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(result.totalPaid)}
                  </p>
                </div>
              </div>

              {/* Payoff Time */}
              <div className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payoff Time
                </h4>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatTimeperiod(result.payoffTimeMonths)}
                </p>
              </div>

              {/* Extra Payment Savings */}
              {result.payoffTimeSavings && result.payoffTimeSavings > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                    Time Saved with Extra Payment
                  </h4>
                  <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                    {formatTimeperiod(result.payoffTimeSavings)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    You'll pay off your loan faster!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Enter your loan details and click "Calculate" to see your results.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          How It Works
        </h3>
        <div className="prose prose-sm text-gray-600 dark:text-gray-300">
          <p className="mb-4">
            The monthly payment is calculated using the standard loan payment formula:
          </p>
          <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg font-mono text-sm mb-4 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-gray-100">
            M = P × r × (1 + r)^n / ((1 + r)^n - 1)
          </div>
          <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <p><strong className="text-gray-900 dark:text-white">M</strong> = Monthly payment</p>
            <p><strong className="text-gray-900 dark:text-white">P</strong> = Principal (loan amount)</p>
            <p><strong className="text-gray-900 dark:text-white">r</strong> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</p>
            <p><strong className="text-gray-900 dark:text-white">n</strong> = Total number of payments (years × 12)</p>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            For zero interest loans, the monthly payment is simply the principal divided by the number of months.
          </p>
        </div>
      </div>
    </div>
  );
}