import React, { useState } from 'react'
import { Scissors, Wand2, Video, UserCircle2, Home, FileText, Palette, Users, Trash2, HelpCircle, Type, LogOut, Image, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

interface CustomerPanelProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Sidebar: React.FC<{ onLogout: () => void; isMobile: boolean; toggleSidebar: () => void }> = ({ onLogout, isMobile, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <aside className={`bg-white shadow-md ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out' : 'w-64'}`}>
      <nav className="p-4">
        {isMobile && (
          <button onClick={toggleSidebar} className="mb-4">
            <X size={24} />
          </button>
        )}
        <ul className="space-y-2">
          <li><Link to="/customer-panel" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><Home size={20} /><span>Dashboard</span></Link></li>
          <li><Link to="/text-to-video" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><Type size={20} /><span>Text to Video</span></Link></li>
          <li><Link to="/text-to-image" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><Image size={20} /><span>Text to Image</span></Link></li>
          <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><FileText size={20} /><span>My Projects</span></a></li>
          <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><Palette size={20} /><span>Templates</span></a></li>
          <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><Users size={20} /><span>Team</span></a></li>
          <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><Trash2 size={20} /><span>Trash</span></a></li>
          <li><a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600" onClick={handleLinkClick}><HelpCircle size={20} /><span>Help</span></a></li>
          <li><button onClick={handleLogout} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"><LogOut size={20} /><span>Logout</span></button></li>
        </ul>
      </nav>
    </aside>
  )
}

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`flex flex-col items-center p-4 rounded-lg ${active ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    {icon}
    <span className="mt-2 text-sm">{label}</span>
  </button>
)

const ProjectCard: React.FC<{ icon: React.ReactNode; title: string; description: string; image: string; link: string }> = ({ icon, title, description, image, link }) => (
  <Link to={link} className="block">
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex items-center mb-2">
          {icon}
          <h3 className="ml-2 text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </Link>
)

const CustomerPanel: React.FC<CustomerPanelProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50">
          <Menu size={24} />
        </button>
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
        )}
      </div>
      <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar onLogout={onLogout} isMobile={true} toggleSidebar={toggleSidebar} />
      </div>
      <div className="hidden md:block">
        <Sidebar onLogout={onLogout} isMobile={false} toggleSidebar={() => {}} />
      </div>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-2">Hello, {user?.name || 'User'}</h1>
        <p className="text-lg text-gray-600 mb-8">Let's get started</p>

        <div className="flex flex-wrap justify-between mb-12 gap-4">
          <ActionButton icon={<Scissors size={24} />} label="Create" active />
          <ActionButton icon={<Wand2 size={24} />} label="AI Edits" />
          <ActionButton icon={<Video size={24} />} label="Your templates" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            icon={<Type className="w-6 h-6 text-green-600" />}
            title="Generate Text to Video"
            description="Transform your text into engaging videos."
            image="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            link="/text-to-video"
          />
          <ProjectCard
            icon={<Image className="w-6 h-6 text-blue-600" />}
            title="Generate Text to Image"
            description="Create stunning images from text descriptions."
            image="https://images.unsplash.com/photo-1579566346927-c68383817a25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            link="/text-to-image"
          />
          <ProjectCard
            icon={<Video className="w-6 h-6 text-red-600" />}
            title="Record Video"
            description="Capture your webcam, screen or slides."
            image="https://images.unsplash.com/photo-1633113093730-47449a1a9c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            link="#"
          />
          <ProjectCard
            icon={<UserCircle2 className="w-6 h-6 text-purple-600" />}
            title="Create AI Avatar Video"
            description="Bring your script to life with an avatar."
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
            link="#"
          />
        </div>
      </main>
    </div>
  )
}

export default CustomerPanel