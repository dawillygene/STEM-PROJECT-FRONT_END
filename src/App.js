import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} /> 
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;