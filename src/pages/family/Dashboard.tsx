import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const MOCK_PATIENTS = [
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

export const FamilyDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-300">Family Dashboard</h1>
        <p className="text-gray-400">Monitor the care provided to your loved ones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-200 text-blue-800 mr-4">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300">Assigned Patients</h3>
              <p className="text-3xl font-bold text-blue-600">{MOCK_PATIENTS.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-200 text-yellow-800 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300">Pending Tasks</h3>
              <p className="text-3xl font-bold text-yellow-600">{pendingTasks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-200 text-green-800 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300">Completed Tasks</h3>
              <p className="text-3xl font-bold text-green-600">{completedTasks.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-300">Today's Tasks</h2>
          <div className="relative mt-2 sm:mt-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-300" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-700">
            {filteredTasks.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                No tasks found. Try adjusting your search or filters.
              </div>
            ) : (
              filteredTasks.map(task => {
                const patient = MOCK_PATIENTS.find(p => p.id === task.patientId);
                return (
                  <div key={task.id} className="p-4 hover:bg-gray-700">
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
                          <h3 className="text-base font-medium text-gray-300">{task.title}</h3>
                          <p className="text-sm text-gray-400">{task.description}</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            {format(task.dueDate, 'MMM d, yyyy h:mm a')}
                            <span className="mx-2">•</span>
                            <User size={14} className="mr-1" />
                            {patient?.name || 'Unknown patient'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};