import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, Calendar, User, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const MOCK_ASSIGNED_PATIENTS = [
  { id: '1', name: 'Alice Brown', age: 65, condition: 'Post-stroke recovery', room: '101' },
  { id: '2', name: 'Bob Wilson', age: 72, condition: 'Parkinson\'s disease', room: '102' },
];

const MOCK_TASKS = [
  { 
    id: '1', 
    patientId: '1', 
    title: 'Morning medication', 
    description: 'Administer prescribed morning medication with breakfast',
    dueDate: new Date(2025, 5, 15, 8, 0),
    status: 'pending',
    priority: 'high'
  },
  { 
    id: '2', 
    patientId: '1', 
    title: 'Physical therapy session', 
    description: 'Assist with mobility exercises as per physiotherapist\'s instructions',
    dueDate: new Date(2025, 5, 15, 10, 30),
    status: 'completed',
    priority: 'medium'
  },
  { 
    id: '3', 
    patientId: '2', 
    title: 'Lunch and medication', 
    description: 'Prepare lunch and administer midday medication',
    dueDate: new Date(2025, 5, 15, 12, 0),
    status: 'pending',
    priority: 'high'
  },
  { 
    id: '4', 
    patientId: '2', 
    title: 'Evening check-up', 
    description: 'Check vital signs and record in the system',
    dueDate: new Date(2025, 5, 15, 18, 0),
    status: 'pending',
    priority: 'medium'
  },
];

export const CaretakerDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | 'all'>('all');

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = selectedPatient === 'all' || task.patientId === selectedPatient;
    return matchesSearch && matchesPatient;
  });

  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  const handleCompleteTask = (taskId: string) => {
    // In a real app, this would update the task status in the database
    console.log(`Task ${taskId} marked as completed`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-300">Caretaker Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your assigned patients and tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-200 text-blue-600 dark:text-blue-800 mr-4">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Assigned Patients</h3>
              <p className="text-3xl font-bold text-blue-600">{MOCK_ASSIGNED_PATIENTS.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-200 text-yellow-600 dark:text-yellow-800 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pending Tasks</h3>
              <p className="text-3xl font-bold text-yellow-600">{pendingTasks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-200 text-green-600 dark:text-green-800 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Completed Tasks</h3>
              <p className="text-3xl font-bold text-green-600">{completedTasks.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">My Patients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_ASSIGNED_PATIENTS.map(patient => (
            <div 
              key={patient.id} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 cursor-pointer ${
                selectedPatient === patient.id ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setSelectedPatient(selectedPatient === patient.id ? 'all' : patient.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-300">{patient.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Age: {patient.age}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Room: {patient.room}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-900">
                  {patient.condition}
                </span>
              </div>
            </div>
          ))}
          <div 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-dashed flex items-center justify-center cursor-pointer ${
              selectedPatient === 'all' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setSelectedPatient('all')}
          >
            <span className="text-gray-600 dark:text-gray-400">View All Patients</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Today's Tasks</h2>
          <div className="relative mt-2 sm:mt-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400 dark:text-gray-300" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No tasks found. Try adjusting your search or filters.
              </div>
            ) : (
              filteredTasks.map(task => {
                const patient = MOCK_ASSIGNED_PATIENTS.find(p => p.id === task.patientId);
                return (
                  <div key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        {task.status === 'completed' ? (
                          <CheckCircle className="mt-1 text-green-500 flex-shrink-0" size={20} />
                        ) : task.priority === 'high' ? (
                          <AlertCircle className="mt-1 text-red-500 flex-shrink-0" size={20} />
                        ) : (
                          <Clock className="mt-1 text-yellow-500 flex-shrink-0" size={20} />
                        )}
                        <div className="ml-3">
                          <h3 className="text-base font-medium text-gray-800 dark:text-gray-300">{task.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar size={14} className="mr-1" />
                            {format(task.dueDate, 'MMM d, yyyy h:mm a')}
                            <span className="mx-2">•</span>
                            <User size={14} className="mr-1" />
                            {patient?.name || 'Unknown patient'}
                          </div>
                        </div>
                      </div>
                      {task.status !== 'completed' && (
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="px-3 py-1 bg-green-100 dark:bg-green-200 text-green-800 dark:text-green-900 text-sm rounded-md hover:bg-green-200 dark:hover:bg-green-300"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="text-blue-600 dark:text-blue-800" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300">Sign Language Converter</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Break communication barriers with our advanced sign language conversion tool.
            </p>
            <button
              onClick={() => window.location.href = '/sign-language'}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};