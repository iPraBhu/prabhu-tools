export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {currentYear} PraBhu Tools. All rights reserved.
          </div>
          
          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <a 
              href="https://github.com/iPraBhu/prabhu-tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Visit our GitHub repository"
            >
              GitHub
            </a>
            <a 
              href="mailto:contact@example.com" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Contact us via email"
            >
              Contact
            </a>
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
          </div>
        </div>
        
        {/* Additional info */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          Built with React, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.
        </div>
      </div>
    </footer>
  );
}