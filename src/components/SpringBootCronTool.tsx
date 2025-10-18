import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSEO } from '../hooks/useSEO';

const cronExamples = [
  { expr: '0 0 * * * *', desc: 'Every hour' },
  { expr: '0 */30 * * * *', desc: 'Every 30 minutes' },
  { expr: '0 0 8 * * *', desc: 'Every day at 8:00 AM' },
  { expr: '0 0 9 * * MON-FRI', desc: 'Every weekday at 9:00 AM' },
  { expr: '0 0 0 1 * *', desc: 'At midnight on the 1st of every month' },
  { expr: '0 0 0 * * SUN', desc: 'Every Sunday at midnight' },
];

const fieldNames = ['Second', 'Minute', 'Hour', 'Day', 'Month', 'Weekday'];
const fieldDescriptions = [
  'Seconds (0-59)',
  'Minutes (0-59)', 
  'Hours (0-23)',
  'Day of month (1-31)',
  'Month (1-12 or JAN-DEC)',
  'Day of week (0-7 or SUN-SAT)'
];

function parseField(value: string, fieldType: string): string {
  if (value === '*') return 'every ' + fieldType.toLowerCase();
  if (value === '?') return 'any ' + fieldType.toLowerCase();
  if (value.includes('/')) {
    const [start, step] = value.split('/');
    return `every ${step} ${fieldType.toLowerCase()}${start !== '*' ? ` starting from ${start}` : ''}`;
  }
  if (value.includes('-')) {
    const [start, end] = value.split('-');
    return `${fieldType.toLowerCase()} ${start} through ${end}`;
  }
  if (value.includes(',')) {
    const values = value.split(',');
    return `${fieldType.toLowerCase()} ${values.join(', ')}`;
  }
  return `${fieldType.toLowerCase()} ${value}`;
}

function explainCron(cron: string): { summary: string; breakdown: string[]; isValid: boolean } {
  const parts = cron.trim().split(/\s+/);
  
  if (parts.length !== 6) {
    return {
      summary: 'Invalid: Spring Boot cron expressions must have exactly 6 fields',
      breakdown: [],
      isValid: false
    };
  }

  const [second, minute, hour, day, month, weekday] = parts;
  const breakdown = parts.map((part, index) => 
    `${fieldNames[index]}: ${parseField(part, fieldNames[index])}`
  );

  // Month names mapping
  const monthNames: { [key: string]: string } = {
    '1': 'January', '2': 'February', '3': 'March', '4': 'April',
    '5': 'May', '6': 'June', '7': 'July', '8': 'August',
    '9': 'September', '10': 'October', '11': 'November', '12': 'December'
  };

  // Generate human-readable summary
  let summary = '';
  
  // Common patterns
  if (second === '0' && minute === '0' && hour === '*' && day === '*' && month === '*' && weekday === '*') {
    summary = 'At the start of every hour';
  } else if (second === '0' && minute === '0' && hour !== '*' && day === '*' && month === '*' && weekday === '*') {
    summary = `Every day at ${hour}:00`;
  } else if (second === '0' && minute.includes('/') && hour === '*' && day === '*' && month === '*' && weekday === '*') {
    const interval = minute.split('/')[1];
    summary = `At every ${interval}${getOrdinalSuffix(interval)} minute`;
  } else if (second === '0' && minute.includes('/') && hour === '*' && day === '*' && month !== '*' && weekday === '*') {
    const interval = minute.split('/')[1];
    const monthName = monthNames[month] || month;
    summary = `At every ${interval}${getOrdinalSuffix(interval)} minute in ${monthName}`;
  } else if (second === '0' && minute === '0' && hour.includes('/') && day === '*' && month !== '*' && weekday === '*') {
    const interval = hour.split('/')[1];
    const monthName = monthNames[month] || month;
    summary = `At minute 0 past every ${interval}${getOrdinalSuffix(interval)} hour in ${monthName}`;
  } else if (second === '0' && minute === '0' && hour.includes('/') && day === '*' && month === '*' && weekday === '*') {
    const interval = hour.split('/')[1];
    summary = `At minute 0 past every ${interval}${getOrdinalSuffix(interval)} hour`;
  } else if (second === '0' && minute === '0' && hour !== '*' && day === '*' && month === '*' && weekday !== '*') {
    summary = `At ${hour}:00 on ${weekday}`;
  } else if (second === '0' && minute === '0' && hour === '0' && day === '1' && month === '*' && weekday === '*') {
    summary = 'At midnight on the first day of every month';
  } else {
    // Generic description
    let timeParts = [];
    if (second !== '0') timeParts.push(`second ${second}`);
    
    if (minute === '*') {
      timeParts.push('every minute');
    } else if (minute.includes('/')) {
      const interval = minute.split('/')[1];
      timeParts.push(`every ${interval}${getOrdinalSuffix(interval)} minute`);
    } else {
      timeParts.push(`minute ${minute}`);
    }
    
    if (hour !== '*') timeParts.push(`hour ${hour}`);
    
    let dayParts = [];
    if (day !== '*') dayParts.push(`day ${day} of month`);
    if (month !== '*') {
      const monthName = monthNames[month] || month;
      dayParts.push(`in ${monthName}`);
    }
    if (weekday !== '*') dayParts.push(`on ${weekday}`);
    
    if (dayParts.length === 0) dayParts.push('every day');
    
    summary = `At ${timeParts.join(', ')}, ${dayParts.join(', ')}`;
  }

  return { summary, breakdown, isValid: true };
}

function getOrdinalSuffix(num: string): string {
  const n = parseInt(num);
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return suffix[(v - 20) % 10] || suffix[v] || suffix[0];
}

export default function SpringBootCronTool() {
  useSEO({
    title: 'Cron Expression Generator & Validator | Spring Boot Cron Job Scheduler - PraBhu Tools',
    description: 'Generate and validate cron expressions for Spring Boot applications. Free online cron job scheduler with human-readable explanations and real-time validation.',
    keywords: 'cron expression generator, spring boot cron, cron job scheduler, cron validator, crontab generator, spring boot scheduler, cron syntax, quartz cron expressions',
    canonical: 'https://tools.adevguide.com/tools/spring-boot-cron-tool',
    ogTitle: 'Cron Expression Generator - Spring Boot Scheduler Tool',
    ogDescription: 'Create and validate cron expressions for Spring Boot with instant human-readable explanations.',
  });

  const { theme, toggleTheme } = useTheme();
  const [cron, setCron] = useState('0 0 * * * *');
  const [explanation, setExplanation] = useState(explainCron('0 0 * * * *'));

  useEffect(() => {
    if (cron.trim()) {
      setExplanation(explainCron(cron));
    }
  }, [cron]);

  const handleExampleClick = (expr: string) => {
    setCron(expr);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-6 sm:py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent text-center px-2">
              Spring Boot Cron Tool
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-3 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Professional Spring Boot schedule expression editor. Enter your 6-field cron expression to get a human-readable description.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          {/* Input Section */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Cron Expression
            </label>
            <div className="relative">
              <input
                type="text"
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                className="w-full text-base sm:text-lg lg:text-xl xl:text-2xl font-mono p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 dark:text-gray-100 min-h-[56px] pr-12 sm:pr-16"
                placeholder="0 0 * * * *"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                {explanation.isValid ? (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500 text-lg sm:text-xl font-bold">✓</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 text-lg sm:text-xl font-bold">✗</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <div className={`p-6 rounded-xl border-2 backdrop-blur-sm ${
              explanation.isValid 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
                : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800'
            } transition-all duration-300`}>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  explanation.isValid ? 'bg-green-500' : 'bg-red-500'
                } animate-pulse`}></span>
                {explanation.isValid ? 'This cron job will run:' : 'Error:'}
              </h3>
              <p className={`text-xl font-medium ${
                explanation.isValid ? 'text-green-800 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {explanation.summary}
              </p>
            </div>
          </div>

          {/* Field Breakdown */}
          {explanation.isValid && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Field Breakdown:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {explanation.breakdown.map((field, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all duration-200">
                    <div className="w-20 text-sm font-bold text-blue-600 dark:text-blue-400 mr-3">
                      {fieldNames[index]}:
                    </div>
                    <div className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-slate-900 px-3 py-1 rounded-md mr-3 border border-slate-200 dark:border-slate-600">
                      {cron.split(/\s+/)[index]}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                      {field.split(': ')[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Field Reference */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Field Reference:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fieldDescriptions.map((desc, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200">
                  <div className="font-bold text-blue-800 dark:text-blue-300 mb-1">{fieldNames[index]}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
            <span className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></span>
            Common Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cronExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example.expr)}
                className="text-left p-5 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1"
              >
                <div className="font-mono text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {example.expr}
                </div>
                <div className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                  {example.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
