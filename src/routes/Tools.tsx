import { Link } from 'react-router-dom';
import MonthlyPaymentCalculator from '../components/MonthlyPaymentCalculator';

export default function Tools() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600" aria-label="Breadcrumb">
          <Link 
            to="/" 
            className="hover:text-gray-900 transition-colors duration-200"
            aria-label="Go back to home page"
          >
            Home
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">Monthly Payment Calculator</span>
        </nav>
      </div>
      
      <MonthlyPaymentCalculator />
    </div>
  );
}