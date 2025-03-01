import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">Patient Care Management System</h1>
        <button onClick={logout} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};