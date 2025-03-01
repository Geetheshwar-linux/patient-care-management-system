import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Github, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Geetheshwar G',
    role: 'Cheif Architect',
    bio: 'Reg No : 99220040368. CSE',
    image: 'images/geetheshwar.jpg',

    social: {
      instagram: 'https://www.instagram.com/geetheshwarg/',
      github: 'https://github.com/Geetheshwar-linux',
      linkedin: 'https://www.linkedin.com/in/geetheshwar-g-4b1b3b1b3/',
    },
  },
  {
    name: 'Sai Bhavana V',
    role: 'CTO',
    bio: 'Reg No : 99220045391. ECE',
    image: 'images/SaiBhavana.jpg',
    social: {
      instagram: 'https://instagram.com/vsb_chinni_2005',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com/in/Vaddi%20saibhavana',
    },
  },
  {
    name: 'Alice Brown',
    role: 'COO',
    bio: 'Alice oversees our operations, making sure everything runs smoothly.',
    image: 'https://via.placeholder.com/150',
    social: {
      instagram: 'https://instagram.com/alicebrown',
      github: 'https://github.com/alicebrown',
      linkedin: 'https://linkedin.com/in/alicebrown',
    },
  },
  {
    name: 'Michael Johnson',
    role: 'CFO',
    bio: 'Michael manages our financial operations and ensures our financial health.',
    image: 'https://via.placeholder.com/150',
    social: {
      instagram: 'https://instagram.com/michaeljohnson',
      github: 'https://github.com/michaeljohnson',
      linkedin: 'https://linkedin.com/in/michaeljohnson',
    },
  },
  {
    name: 'Emily Davis',
    role: 'CMO',
    bio: 'Emily is responsible for our marketing strategies and outreach programs.',
    image: 'https://via.placeholder.com/150',
    social: {
      instagram: 'https://instagram.com/emilydavis',
      github: 'https://github.com/emilydavis',
      linkedin: 'https://linkedin.com/in/emilydavis',
    },
  },
];

export const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate__animated animate__fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">About Us</h1>
          <button
            onClick={handleBackToHome}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-gray-800 rounded-lg shadow p-6 animate__animated animate__zoomIn relative group">
              <img src={member.image} className="w-32 h-32 rounded-full mx-auto mb-4 animate__animated animate__rotateIn" />
              <h2 className="text-xl font-semibold text-white text-center">{member.name}</h2>
              <p className="text-gray-400 text-center">{member.role}</p>
              <p className="text-gray-400 mt-4 text-center">{member.bio}</p>

              <div className="absolute inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-4">
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={24} className="text-gray-400 hover:text-blue-600" />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <Github size={24} className="text-gray-400 hover:text-blue-600" />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={24} className="text-gray-400 hover:text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
