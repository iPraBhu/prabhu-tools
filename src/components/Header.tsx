import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

const navigation: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'GitHub', path: 'https://github.com/iPraBhu/prabhu-tools', external: true },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors duration-200"
              aria-label="PraBhu Tools home page"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <span>PraBhu Tools</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              const isExternal = item.external;
              
              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                    <svg 
                      className="w-4 h-4 ml-1 inline" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              aria-label="Open main menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}