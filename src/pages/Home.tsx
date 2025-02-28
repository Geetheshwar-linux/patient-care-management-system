import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Users, UserCheck, MessageSquare } from 'lucide-react';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Patient Care Management System</h1>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Simplifying Care for Bedridden Patients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A comprehensive platform connecting caretakers, patients, and families with innovative tools for better care management.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Activity className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Organize and track patient care tasks with reminders and notifications.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Caretaker Assignment</h3>
              <p className="text-gray-600">
                Easily assign and manage caretakers for patients with detailed profiles.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Language Converter</h3>
              <p className="text-gray-600">
                Break communication barriers with our advanced sign language conversion tool.
              </p>
              <button
                onClick={() => navigate('/sign-language')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Now
              </button>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Access</h3>
              <p className="text-gray-600">
                Keep families informed with real-time updates on patient care and progress.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Setup</h3>
              <p className="text-gray-600">
                Administrators create accounts for caretakers and assign them to patients.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Caretakers receive tasks, manage schedules, and acknowledge completed activities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Monitoring</h3>
              <p className="text-gray-600">
                Families receive updates and can monitor the care provided to their loved ones.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Patient Care Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};