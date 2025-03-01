import React, { useState } from 'react';
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react';

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

export const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-300">Manage Patients</h1>
        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Add Patient
        </button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Caretaker
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredPatients.map((patient) => {
              const caretaker = MOCK_CARETAKERS.find(c => c.id === patient.caretakerId);
              return (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-300">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{patient.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{patient.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{caretaker?.name || 'Unassigned'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-400 hover:text-blue-500 mr-3">
                      <Edit size={16} />
                    </button>
                    <button className="text-green-400 hover:text-green-500 mr-3">
                      <UserPlus size={16} />
                    </button>
                    <button className="text-red-400 hover:text-red-500">
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
};
