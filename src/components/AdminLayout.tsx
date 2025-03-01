import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Users, Bell, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <div className="fixed top-0 left-0 w-64 bg-gray-800 shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-blue-400">Admin Dashboard</h2>
          </div>
          <nav className="mt-4 flex-1">
            <button onClick={() => navigate('/admin')} className="flex items-center p-4 text-gray-300 hover:bg-gray-700 w-full text-left">
              <Home className="mr-3" size={20} />
              Dashboard
            </button>
            <button onClick={() => navigate('/admin/caretakers')} className="flex items-center p-4 text-gray-300 hover:bg-gray-700 w-full text-left">
              <Users className="mr-3" size={20} />
              Manage Caretakers
            </button>
            <button onClick={() => navigate('/admin/patients')} className="flex items-center p-4 text-gray-300 hover:bg-gray-700 w-full text-left">
              <Bell className="mr-3" size={20} />
              Manage Patients
            </button>
            <button onClick={() => navigate('/admin/tasks')} className="flex items-center p-4 text-gray-300 hover:bg-gray-700 w-full text-left">
              <MessageSquare className="mr-3" size={20} />
              Manage Tasks
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <button onClick={logout} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 ml-64 p-6 bg-gray-900">
        {children}
      </div>
    </div>
  );
};
