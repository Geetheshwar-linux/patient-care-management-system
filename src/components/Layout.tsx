import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Home, Users, Bell, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex">
      <div className={`fixed top-0 left-0 p-4 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out z-30 w-64 bg-white shadow-lg animate__animated animate__slideInLeft`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Patient Care</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-500 focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <a href="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <Home className="mr-3" size={20} />
            Dashboard
          </a>
          <a href="/admin/caretakers" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <Users className="mr-3" size={20} />
            Manage Caretakers
          </a>
          <a href="/admin/patients" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <Bell className="mr-3" size={20} />
            Manage Patients
          </a>
          <a href="/admin/tasks" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <MessageSquare className="mr-3" size={20} />
            Manage Tasks
          </a>
          <a href="/about-us" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <Users className="mr-3" size={20} />
            About Us
          </a>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm animate__animated animate__fadeInDown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-blue-600">Patient Care Management System</h1>
            <button onClick={logout} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 bg-gray-100 p-6 animate__animated animate__fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};