import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function SpringBootRegexTool() {
  const { theme, toggleTheme } = useTheme();
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = () => {
    setError(null);
    try {
      // Spring Boot uses Java regex, which is similar to JS regex for most cases
      const regex = new RegExp(pattern);
      const match = regex.test(testString);
      setResult(match ? 'Match!' : 'No match');
    } catch (e) {
      setError('Invalid regex pattern');
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Spring Boot Regex Tool
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test and validate Java/Spring Boot regex patterns with instant feedback.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Regex Pattern
            </label>
            <input
              type="text"
              className="w-full font-mono p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="e.g. ^[a-zA-Z0-9]+$"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Test String
            </label>
            <input
              type="text"
              className="w-full font-mono p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 dark:text-gray-100"
              value={testString}
              onChange={e => setTestString(e.target.value)}
              placeholder="e.g. Hello123"
            />
          </div>
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg" 
            onClick={handleTest}
          >
            Test Regex
          </button>
          
          {result && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
              <div className="text-lg font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                Result: {result}
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
              <div className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                {error}
              </div>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              <strong>Note:</strong> This tool helps you test Java/Spring Boot regex patterns directly in your browser.
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Some advanced Java regex features may not be supported in JavaScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
