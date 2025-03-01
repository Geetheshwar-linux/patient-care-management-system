import React, { useState } from 'react';
import { User, Clock, CheckCircle, Calendar, MessageSquare, Phone } from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const MOCK_PATIENT = {
  id: '1',
  name: 'Alice Brown',
  age: 65,
  condition: 'Post-stroke recovery',
  room: '101',
  admissionDate: new Date(2025, 4, 1),
};

const MOCK_CARETAKER = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  shift: 'Morning (8 AM - 4 PM)',
  experience: '5 years',
};

const MOCK_TASKS = [
  { 
    id: '1', 
    title: 'Morning medication', 
    description: 'Administer prescribed morning medication with breakfast',
    dueDate: new Date(2025, 5, 15, 8, 0),
    status: 'completed',
    completedAt: new Date(2025, 5, 15, 8, 5),
  },
  { 
    id: '2', 
    title: 'Physical therapy session', 
    description: 'Assist with mobility exercises as per physiotherapist\'s instructions',
    dueDate: new Date(2025, 5, 15, 10, 30),
    status: 'completed',
    completedAt: new Date(2025, 5, 15, 11, 0),
  },
  { 
    id: '3', 
    title: 'Lunch and medication', 
    description: 'Prepare lunch and administer midday medication',
    dueDate: new Date(2025, 5, 15, 12, 0),
    status: 'pending',
  },
  { 
    id: '4', 
    title: 'Evening check-up', 
    description: 'Check vital signs and record in the system',
    dueDate: new Date(2025, 5, 15, 18, 0),
    status: 'pending',
  },
];

const MOCK_UPDATES = [
  {
    id: '1',
    date: new Date(2025, 5, 15, 8, 5),
    message: 'Morning medication administered successfully. Patient had a good breakfast.',
    caretaker: 'John Doe',
  },
  {
    id: '2',
    date: new Date(2025, 5, 15, 11, 0),
    message: 'Completed physical therapy session. Patient showed improvement in mobility.',
    caretaker: 'John Doe',
  },
  {
    id: '3',
    date: new Date(2025, 5, 14, 20, 0),
    message: 'Patient had a restful evening. Vital signs are normal.',
    caretaker: 'Sarah Johnson',
  },
];

export const FamilyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const completedTasks = MOCK_TASKS.filter(task => task.status === 'completed');
  const pendingTasks = MOCK_TASKS.filter(task => task.status === 'pending');

  const renderOverview = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Patient Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="font-medium text-gray-200">{MOCK_PATIENT.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Age:</span>
              <span className="font-medium text-gray-200">{MOCK_PATIENT.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Condition:</span>
              <span className="font-medium text-gray-200">{MOCK_PATIENT.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Room:</span>
              <span className="font-medium text-gray-200">{MOCK_PATIENT.room}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Admission Date:</span>
              <span className="font-medium text-gray-200">{format(MOCK_PATIENT.admissionDate, 'MMMM d, yyyy')}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Assigned Caretaker</h3>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
              <User size={24} />
            </div>
            <div>
              <h4 className="font-medium text-gray-200">{MOCK_CARETAKER.name}</h4>
              <p className="text-sm text-gray-400">{MOCK_CARETAKER.shift}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-400">{MOCK_CARETAKER.phone}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-400">{MOCK_CARETAKER.email}</span>
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Contact Caretaker
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Today's Care Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-xl font-bold text-gray-200">{MOCK_TASKS.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-xl font-bold text-gray-200">{completedTasks.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-xl font-bold text-gray-200">{pendingTasks.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Updates</h3>
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-700">
            {MOCK_UPDATES.map(update => (
              <div key={update.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-200">{update.caretaker}</span>
                  <span className="text-sm text-gray-500">{format(update.date, 'MMM d, h:mm a')}</span>
                </div>
                <p className="text-gray-400">{update.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderTasks = () => (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300">Care Schedule</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {MOCK_TASKS.map(task => (
          <div key={task.id} className="p-4 hover:bg-gray-700">
            <div className="flex items-start">
              {task.status === 'completed' ? (
                <CheckCircle className="mt-1 text-green-500 flex-shrink-0" size={20} />
              ) : (
                <Clock className="mt-1 text-yellow-500 flex-shrink-0" size={20} />
              )}
              <div className="ml-3">
                <h3 className="text-base font-medium text-gray-200">{task.title}</h3>
                <p className="text-sm text-gray-400">{task.description}</p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {format(task.dueDate, 'h:mm a')}
                  {task.status === 'completed' && task.completedAt && (
                    <>
                      <span className="mx-2">•</span>
                      <CheckCircle size={14} className="mr-1 text-green-500" />
                      Completed at {format(task.completedAt, 'h:mm a')}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-300">Family Dashboard</h1>
        <p className="text-gray-400">Monitor care for {MOCK_PATIENT.name}</p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'tasks'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            Care Schedule
          </button>
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'tasks' && renderTasks()}
    </div>
  );
};