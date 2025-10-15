import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import { Tool } from '../types';

const tools: Tool[] = [
  {
    id: 'monthly-payment-calculator',
    name: 'Monthly Payment Calculator',
    description: 'Calculate loan payments, total interest, and see how extra payments can save you time and money.',
    icon: '💰',
    path: '/tools/monthly-payment-calculator',
    category: 'finance',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement for length, weight, temperature, and more.',
    icon: '🔄',
    path: '/tools/unit-converter',
    category: 'converter',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, customizable passwords with various character sets and length options.',
    icon: '🔐',
    path: '/tools/password-generator',
    category: 'utility',
  },
];

export default function Home() {
  const toolsRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleOpenTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      if (toolId === 'monthly-payment-calculator') {
        // Navigate to the calculator page
        navigate('/tools');
      } else {
        alert(`${tool.name} is coming soon! This is a demo of the Monthly Payment Calculator.`);
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onScrollToTools={scrollToTools} />
      
      {/* Tools Section */}
      <section 
        ref={toolsRef} 
        id="tools" 
        className="py-20 bg-white"
        aria-labelledby="tools-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              id="tools-heading" 
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              Available Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professional tools designed to make your calculations easier and more accurate.
            </p>
          </div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onOpenTool={handleOpenTool}
              />
            ))}
          </div>
          
          {/* Coming Soon Notice */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-primary-50 border border-primary-200 rounded-lg">
              <svg 
                className="w-5 h-5 text-primary-600 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-primary-700 font-medium">
                More tools are coming soon! Currently featuring the Monthly Payment Calculator.
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              id="features-heading" 
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Why Choose PraBhu Tools?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern technology and user experience in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Results</h3>
              <p className="text-gray-600 text-sm">Precise calculations using proven mathematical formulas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm">Responsive design that works on all devices</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">No data collection - everything runs in your browser</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source</h3>
              <p className="text-gray-600 text-sm">Transparent code available on GitHub</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}