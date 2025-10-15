import { describe, it, expect } from 'vitest';
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculatePayoffTimeWithExtra,
  calculateLoan,
  validateLoanInputs,
  formatCurrency,
  formatTimeperiod,
} from '../src/lib/finance';

describe('Finance calculations', () => {
  describe('calculateMonthlyPayment', () => {
    it('should calculate correct monthly payment for standard loan', () => {
      const result = calculateMonthlyPayment(300000, 4.5, 30);
      expect(result).toBeCloseTo(1520.06, 2);
    });

    it('should handle zero interest rate', () => {
      const result = calculateMonthlyPayment(120000, 0, 10);
      expect(result).toBe(1000); // 120000 / (10 * 12)
    });

    it('should return 0 for invalid inputs', () => {
      expect(calculateMonthlyPayment(0, 4.5, 30)).toBe(0);
      expect(calculateMonthlyPayment(300000, 4.5, 0)).toBe(0);
      expect(calculateMonthlyPayment(-100000, 4.5, 30)).toBe(0);
    });

    it('should handle high interest rates', () => {
      const result = calculateMonthlyPayment(100000, 25, 30);
      expect(result).toBeCloseTo(2083.33, 2);
    });

    it('should handle short loan terms', () => {
      const result = calculateMonthlyPayment(60000, 6, 5);
      expect(result).toBeCloseTo(1159.69, 2);
    });
  });

  describe('calculateTotalInterest', () => {
    it('should calculate correct total interest', () => {
      const monthlyPayment = 1520.06;
      const result = calculateTotalInterest(monthlyPayment, 30, 300000);
      expect(result).toBeCloseTo(247221.6, 1);
    });

    it('should not return negative interest', () => {
      const result = calculateTotalInterest(500, 30, 300000);
      expect(result).toBe(0);
    });
  });

  describe('calculatePayoffTimeWithExtra', () => {
    it('should calculate payoff time with extra payments', () => {
      const result = calculatePayoffTimeWithExtra(300000, 4.5, 1520.06, 200);
      expect(result).toBeLessThan(360); // Should be less than 30 years
      expect(result).toBeGreaterThan(300); // But still substantial
    });

    it('should return infinity if payment is too low', () => {
      const result = calculatePayoffTimeWithExtra(300000, 10, 100, 0);
      expect(result).toBe(Infinity);
    });

    it('should handle zero interest', () => {
      const result = calculatePayoffTimeWithExtra(120000, 0, 1000, 200);
      expect(result).toBe(100); // 120000 / 1200 = 100 months
    });

    it('should cap at maximum iterations', () => {
      const result = calculatePayoffTimeWithExtra(1000000, 2, 100, 0);
      expect(result).toBeLessThanOrEqual(600);
    });
  });

  describe('calculateLoan', () => {
    it('should return complete loan calculation', () => {
      const params = {
        loanAmount: 300000,
        annualInterestRate: 4.5,
        loanTermMonths: 360, // 30 years * 12 months
        extraMonthlyPayment: 0,
      };
      
      const result = calculateLoan(params);
      
      expect(result.monthlyPayment).toBeCloseTo(1520.06, 2);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.totalPaid).toBeGreaterThan(300000);
      expect(result.payoffTimeMonths).toBe(360);
      expect(result.payoffTimeSavings).toBeUndefined();
    });

    it('should calculate savings with extra payments', () => {
      const params = {
        loanAmount: 300000,
        annualInterestRate: 4.5,
        loanTermMonths: 360, // 30 years * 12 months
        extraMonthlyPayment: 200,
      };
      
      const result = calculateLoan(params);
      
      expect(result.payoffTimeSavings).toBeGreaterThan(0);
    });

    it('should round results to 2 decimal places', () => {
      const params = {
        loanAmount: 123456.789,
        annualInterestRate: 3.33333,
        loanTermMonths: 300, // 25 years * 12 months
        extraMonthlyPayment: 0,
      };
      
      const result = calculateLoan(params);
      
      // Check that all monetary values are rounded to 2 decimal places
      expect(result.monthlyPayment % 0.01).toBeCloseTo(0, 10);
      expect(result.totalInterest % 0.01).toBeCloseTo(0, 10);
      expect(result.totalPaid % 0.01).toBeCloseTo(0, 10);
    });
  });

  describe('validateLoanInputs', () => {
    it('should pass validation for valid inputs', () => {
      const params = {
        loanAmount: 300000,
        annualInterestRate: 4.5,
        loanTermMonths: 360, // 30 years * 12 months
        extraMonthlyPayment: 200,
      };
      
      const result = validateLoanInputs(params);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for invalid loan amount', () => {
      const params = {
        loanAmount: 0,
        annualInterestRate: 4.5,
        loanTermMonths: 360, // 30 years * 12 months
      };
      
      const result = validateLoanInputs(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'loanAmount')).toBe(true);
    });

    it('should fail validation for negative interest rate', () => {
      const params = {
        loanAmount: 300000,
        annualInterestRate: -1,
        loanTermMonths: 360, // 30 years * 12 months
      };
      
      const result = validateLoanInputs(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'annualInterestRate')).toBe(true);
    });

    it('should fail validation for invalid loan term', () => {
      const params = {
        loanAmount: 300000,
        annualInterestRate: 4.5,
        loanTermMonths: 0,
      };
      
      const result = validateLoanInputs(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'loanTermMonths')).toBe(true);
    });

    it('should fail validation for negative extra payment', () => {
      const params = {
        loanAmount: 300000,
        annualInterestRate: 4.5,
        loanTermMonths: 360, // 30 years * 12 months
        extraMonthlyPayment: -100,
      };
      
      const result = validateLoanInputs(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'extraMonthlyPayment')).toBe(true);
    });

    it('should fail validation for excessive values', () => {
      const params = {
        loanAmount: 20000000, // > 10M limit
        annualInterestRate: 75, // > 50% limit
        loanTermMonths: 1200, // > 600 months (50 years) limit
      };
      
      const result = validateLoanInputs(params);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle negative values', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('should round to 2 decimal places', () => {
      expect(formatCurrency(1234.567)).toBe('$1,234.57');
      expect(formatCurrency(1234.5)).toBe('$1,234.50');
    });
  });

  describe('formatTimeperiod', () => {
    it('should format months only', () => {
      expect(formatTimeperiod(11)).toBe('11 months');
      expect(formatTimeperiod(1)).toBe('1 month');
    });

    it('should format years only', () => {
      expect(formatTimeperiod(24)).toBe('2 years');
      expect(formatTimeperiod(12)).toBe('1 year');
    });

    it('should format years and months', () => {
      expect(formatTimeperiod(25)).toBe('2 years and 1 month');
      expect(formatTimeperiod(37)).toBe('3 years and 1 month');
      expect(formatTimeperiod(38)).toBe('3 years and 2 months');
    });

    it('should handle zero', () => {
      expect(formatTimeperiod(0)).toBe('0 months');
    });

    it('should round partial months', () => {
      expect(formatTimeperiod(13.7)).toBe('1 year and 2 months');
    });
  });
});