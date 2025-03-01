import React from 'react';

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
  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Caretakers</h3>
        <p className="text-3xl font-bold text-blue-600">{MOCK_CARETAKERS.length}</p>
      </div>
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Patients</h3>
        <p className="text-3xl font-bold text-blue-600">{MOCK_PATIENTS.length}</p>
      </div>
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Active Tasks</h3>
        <p className="text-3xl font-bold text-blue-600">
          {MOCK_TASKS.filter(task => task.status === 'pending').length}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-300">Admin Dashboard</h1>
        <p className="text-gray-400">Overview of the system</p>
      </div>

      {renderOverview()}
    </div>
  );
};