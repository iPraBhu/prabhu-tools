import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Tools from './routes/Tools';
import SpringBootRegexTool from './components/SpringBootRegexTool';
import SpringBootCronTool from './components/SpringBootCronTool';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/spring-boot-regex-tool" element={<SpringBootRegexTool />} />
            <Route path="/tools/spring-boot-cron-tool" element={<SpringBootCronTool />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;