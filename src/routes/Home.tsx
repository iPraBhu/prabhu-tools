import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import SEOContent from '../components/SEOContent';
import { Tool } from '../types';

const tools: Tool[] = [
  {
    id: 'monthly-payment-calculator',
    name: 'Monthly Loan Payment Calculator',
    description: 'Free mortgage calculator and loan payment calculator. Calculate monthly payments, total interest, and savings from extra payments for any loan type.',
    icon: '💰',
    path: '/tools/monthly-payment-calculator',
    category: 'finance',
  },
  {
    id: 'spring-boot-regex-tool',
    name: 'Java Regex Pattern Tester',
    description: 'Online regex tester for Java and Spring Boot. Test regular expressions, validate patterns, and debug regex with real-time feedback and examples.',
    icon: '🧩',
    path: '/tools/spring-boot-regex-tool',
    category: 'developer',
  },
  {
    id: 'spring-boot-cron-tool',
    name: 'Cron Expression Generator',
    description: 'Free cron job scheduler and cron expression generator. Create, validate, and understand Spring Boot cron expressions with human-readable explanations.',
    icon: '⏰',
    path: '/tools/spring-boot-cron-tool',
    category: 'developer',
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
        navigate('/tools');
      } else if (toolId === 'spring-boot-regex-tool') {
        navigate('/tools/spring-boot-regex-tool');
      } else if (toolId === 'spring-boot-cron-tool') {
        navigate('/tools/spring-boot-cron-tool');
      } else {
        alert(`${tool.name} is coming soon!`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <Hero onScrollToTools={scrollToTools} />
      
      {/* Tools Section */}
      <section 
        ref={toolsRef} 
        id="tools" 
        className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
        aria-labelledby="tools-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              id="tools-heading" 
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Free Online Calculator & Developer Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional online calculators and developer utilities including loan payment calculator, Spring Boot regex tester, and cron expression generator. All tools are free, secure, and work offline.
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
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors duration-300" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              id="features-heading" 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Best Free Online Calculator Tools - Here's Why
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trusted by thousands of developers and finance professionals worldwide. Built with modern web technology for speed, security, and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bank-Grade Accuracy</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Precise loan payment calculations and regex validations using industry-standard formulas and algorithms</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile-First Design</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fully responsive calculator interface that works perfectly on smartphones, tablets, and desktop computers</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Zero Data Collection</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Complete privacy protection - all calculations run locally in your browser with no personal data storage</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Open Source</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Transparent code available for review and contribution</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEO Content Section */}
      <SEOContent />
    </div>
  );
}