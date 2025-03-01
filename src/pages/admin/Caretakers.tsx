import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Mock data
const MOCK_CARETAKERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', patients: 3 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', patients: 2 },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1122334455', patients: 1 },
];

export const Caretakers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCaretakers = MOCK_CARETAKERS.filter(
    caretaker => caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caretaker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-300">Manage Caretakers</h1>
        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Add Caretaker
        </button>
      </div>
      <div className="relative w-full sm:w-64 mb-6">
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search caretakers..."
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Patients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredCaretakers.map((caretaker) => (
              <tr key={caretaker.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-300">{caretaker.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{caretaker.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{caretaker.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{caretaker.patients}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-400 hover:text-blue-500 mr-3">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-400 hover:text-red-500">
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
};
