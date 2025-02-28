import React from 'react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO',
    bio: 'John is the visionary behind our company with over 20 years of experience in healthcare management.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    bio: 'Jane leads our technology team, ensuring our platform is secure and scalable.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Alice Brown',
    role: 'COO',
    bio: 'Alice oversees our operations, making sure everything runs smoothly.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Michael Johnson',
    role: 'CFO',
    bio: 'Michael manages our financial operations and ensures our financial health.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Emily Davis',
    role: 'CMO',
    bio: 'Emily is responsible for our marketing strategies and outreach programs.',
    image: 'https://via.placeholder.com/150',
  },
];

export const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 animate__animated animate__fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 animate__animated animate__zoomIn">About Us</h1>
          <button
            onClick={handleBackToHome}
            className="bg-blue-500 text-white px-4 py-2 rounded animate__animated animate__bounceIn"
          >
            Back to Home
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow p-6 animate__animated animate__zoomIn">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 text-center">{member.name}</h2>
              <p className="text-gray-600 text-center">{member.role}</p>
              <p className="text-gray-600 mt-4">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
