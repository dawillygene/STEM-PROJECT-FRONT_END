import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import About from './pages/About';
import NotFound from './pages/NotFound';
import BlogTest from './pages/BlogTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogTest />} /> 
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;