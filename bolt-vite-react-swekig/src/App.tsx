import React, { useState } from 'react'
import { Video, Menu, X } from 'lucide-react'
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom'
import CustomerPanel from './components/CustomerPanel'
import TextToVideo from './components/TextToVideo'
import TextToImage from './components/TextToImage'
import Login from './components/Login'
import Signup from './components/Signup'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Video className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">VideoAI</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link to="/" className={`text-gray-600 hover:text-indigo-600 ${location.pathname === '/' ? 'font-bold' : ''}`}>Home</Link></li>
              <li><Link to="/features" className={`text-gray-600 hover:text-indigo-600 ${location.pathname === '/features' ? 'font-bold' : ''}`}>Features</Link></li>
              <li><Link to="/pricing" className={`text-gray-600 hover:text-indigo-600 ${location.pathname === '/pricing' ? 'font-bold' : ''}`}>Pricing</Link></li>
              <li><Link to="/about" className={`text-gray-600 hover:text-indigo-600 ${location.pathname === '/about' ? 'font-bold' : ''}`}>About</Link></li>
              <li><Link to="/contact" className={`text-gray-600 hover:text-indigo-600 ${location.pathname === '/contact' ? 'font-bold' : ''}`}>Contact</Link></li>
              {user ? (
                <>
                  <li><Link to="/customer-panel" className={`text-gray-600 hover:text-indigo-600 ${location.pathname === '/customer-panel' ? 'font-bold' : ''}`}>Dashboard</Link></li>
                  <li><button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Logout</button></li>
                </>
              ) : (
                <li><Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Login</Link></li>
              )}
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white py-4">
            <ul className="flex flex-col space-y-2 px-4">
              <li><Link to="/" className="block text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/features" className="block text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Features</Link></li>
              <li><Link to="/pricing" className="block text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Pricing</Link></li>
              <li><Link to="/about" className="block text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>About</Link></li>
              <li><Link to="/contact" className="block text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Contact</Link></li>
              {user ? (
                <>
                  <li><Link to="/customer-panel" className="block text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Dashboard</Link></li>
                  <li><button onClick={() => { handleLogout(); toggleMenu(); }} className="w-full text-left bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Logout</button></li>
                </>
              ) : (
                <li><Link to="/login" className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300" onClick={toggleMenu}>Login</Link></li>
              )}
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/customer-panel" 
            element={user ? <CustomerPanel user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/text-to-video" 
            element={user ? <TextToVideo /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/text-to-image" 
            element={user ? <TextToImage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-indigo-400">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-indigo-400">Pricing</Link></li>
                <li><a href="#" className="hover:text-indigo-400">Tutorial</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
                <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 VideoAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App