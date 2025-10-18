import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white border-t border-gray-800 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-400 dark:text-gray-500 text-center md:text-left">
            © {currentYear} PraBhu Tools. All rights reserved.
          </div>
          
          {/* Links */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm items-center">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-1 py-1 px-2 rounded-md hover:bg-gray-800 dark:hover:bg-slate-800 min-h-[40px]"
              aria-label="Visit our GitHub repository"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a 
              href="mailto:contact@adevguide.com" 
              className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-1 py-1 px-2 rounded-md hover:bg-gray-800 dark:hover:bg-slate-800 min-h-[40px]"
              aria-label="Contact us via email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact</span>
            </a>
            <a 
              href="/privacy" 
              className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-200 py-1 px-2 rounded-md hover:bg-gray-800 dark:hover:bg-slate-800 min-h-[40px] flex items-center"
            >
              Privacy
            </a>
          </div>
        </div>
        
        {/* Additional info */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700 dark:border-slate-800 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-600 mb-2 px-2">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-gray-600 dark:text-gray-700">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              {theme === 'dark' ? 'Dark' : 'Light'} Theme Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}