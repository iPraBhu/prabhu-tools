import { Link } from 'react-router-dom';
import MonthlyPaymentCalculator from '../components/MonthlyPaymentCalculator';
import { useSEO } from '../hooks/useSEO';

export default function Tools() {
  useSEO({
    title: 'Free Monthly Loan Payment Calculator | Mortgage & Auto Loan Calculator - PraBhu Tools',
    description: 'Calculate monthly loan payments for mortgages, auto loans, and personal loans. Free online calculator with amortization schedule, interest calculations, and extra payment savings analysis.',
    keywords: 'monthly payment calculator, loan calculator, mortgage calculator, auto loan calculator, personal loan calculator, amortization calculator, interest calculator, extra payment calculator, loan payment formula',
    canonical: 'https://tools.adevguide.com/tools',
    ogTitle: 'Free Monthly Loan Payment Calculator - PraBhu Tools',
    ogDescription: 'Calculate monthly loan payments, total interest, and savings from extra payments. Free online calculator for all loan types.',
  });
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors duration-300">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
          <Link 
            to="/" 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
            aria-label="Go back to home page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </Link>
          <svg className="w-4 h-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 dark:text-white font-medium flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>Monthly Payment Calculator</span>
          </span>
        </nav>
      </div>
      
      <MonthlyPaymentCalculator />
    </div>
  );
}