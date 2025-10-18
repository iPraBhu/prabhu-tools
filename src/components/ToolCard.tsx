import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onOpenTool: (toolId: string) => void;
}

export default function ToolCard({ tool, onOpenTool }: ToolCardProps) {
  const handleClick = () => {
    onOpenTool(tool.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenTool(tool.id);
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'finance':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'converter':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'developer':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div 
      className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 lg:p-6 hover:shadow-xl dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 min-h-[140px] sm:min-h-[160px] flex flex-col"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${tool.name} tool`}
    >
      {/* Icon */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
        <span className="text-xl sm:text-2xl" role="img" aria-label={`${tool.name} icon`}>
          {tool.icon}
        </span>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
          {tool.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed flex-1 line-clamp-2">
          {tool.description}
        </p>
        
        {/* Category badge and action */}
        <div className="flex items-center justify-between mt-auto">
          <span className={`inline-flex px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${getCategoryStyles(tool.category)}`}>
            {tool.category}
          </span>
          
          {/* Open button */}
          <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 min-h-[32px]">
            <span>Open</span>
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}