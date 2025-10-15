import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Tools from './routes/Tools';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;