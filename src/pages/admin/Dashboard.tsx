import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const MOCK_CARETAKERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', patients: 3 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', patients: 2 },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1122334455', patients: 1 },
];

const MOCK_PATIENTS = [
  { id: '1', name: 'Alice Brown', age: 65, condition: 'Post-stroke recovery', caretakerId: '1' },
  { id: '2', name: 'Bob Wilson', age: 72, condition: 'Parkinson\'s disease', caretakerId: '1' },
  { id: '3', name: 'Carol Davis', age: 58, condition: 'Multiple sclerosis', caretakerId: '2' },
  { id: '4', name: 'David Miller', age: 80, condition: 'Alzheimer\'s disease', caretakerId: '2' },
  { id: '5', name: 'Eva Garcia', age: 45, condition: 'Spinal cord injury', caretakerId: '3' },
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
    patientId: '3', 
    title: 'Evening check-up', 
    description: 'Check vital signs and record in the system',
    dueDate: new Date(2025, 5, 15, 18, 0),
    status: 'pending',
    priority: 'medium'
  },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCaretakers = MOCK_CARETAKERS.filter(
    caretaker => caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caretaker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = MOCK_PATIENTS.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTasks = MOCK_TASKS.filter(
    task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Caretakers</h3>
        <p className="text-3xl font-bold text-blue-600">{MOCK_CARETAKERS.length}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Patients</h3>
        <p className="text-3xl font-bold text-blue-600">{MOCK_PATIENTS.length}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Tasks</h3>
        <p className="text-3xl font-bold text-blue-600">
          {MOCK_TASKS.filter(task => task.status === 'pending').length}
        </p>
      </div>
    </div>
  );

  const renderCaretakers = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Caretakers</h3>
        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Add Caretaker
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCaretakers.map((caretaker) => (
              <tr key={caretaker.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{caretaker.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{caretaker.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{caretaker.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{caretaker.patients}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Patients</h3>
        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Add Patient
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Caretaker
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => {
              const caretaker = MOCK_CARETAKERS.find(c => c.id === patient.caretakerId);
              return (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{caretaker?.name || 'Unassigned'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <UserPlus size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Add Task
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => {
              const patient = MOCK_PATIENTS.find(p => p.id === task.patientId);
              return (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient?.name || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {format(task.dueDate, 'MMM d, yyyy h:mm a')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage caretakers, patients, and tasks</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'caretakers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('caretakers')}
          >
            Caretakers
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('patients')}
          >
            Patients
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'tasks'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'caretakers' && renderCaretakers()}
      {activeTab === 'patients' && renderPatients()}
      {activeTab === 'tasks' && renderTasks()}
    </div>
  );
};