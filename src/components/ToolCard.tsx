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

  return (
    <div 
      className="card cursor-pointer group"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${tool.name} tool`}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-200">
        <span className="text-2xl" role="img" aria-label={`${tool.name} icon`}>
          {tool.icon}
        </span>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {tool.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {tool.description}
        </p>
        
        {/* Category badge */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            tool.category === 'finance' 
              ? 'bg-green-100 text-green-800'
              : tool.category === 'converter'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {tool.category}
          </span>
          
          {/* Open button */}
          <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors duration-200">
            Open
            <svg 
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" 
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