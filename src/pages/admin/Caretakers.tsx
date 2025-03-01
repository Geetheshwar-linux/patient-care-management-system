import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

// Mock data  
const MOCK_CARETAKERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', patients: 3 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', patients: 2 },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1122334455', patients: 1 },
];

interface Caretaker {
  id: string;
  name: string;
  email: string;
  phone: string;
  patients: number;
}

export const Caretakers: React.FC = () => {
  const [caretakers, setCaretakers] = useState(MOCK_CARETAKERS);
  const [editingCaretaker, setEditingCaretaker] = useState<Caretaker | null>(null);
  const [newCaretaker, setNewCaretaker] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setNewCaretaker({ ...newCaretaker, [name]: value });
  };

  const handleAddCaretaker = () => {
    setShowForm(true);
  };

  const handleSaveNewCaretaker = () => {
    setCaretakers([...caretakers, { ...newCaretaker, id: String(caretakers.length + 1), patients: 0 }]);
    setNewCaretaker({
      name: '',
      email: '',
      phone: ''
    });
    setShowForm(false);
  };

  const handleEditCaretaker = (caretaker: Caretaker) => {
    setEditingCaretaker(caretaker);
  };

  const handleSaveCaretaker = () => {
    if (editingCaretaker) {
      setCaretakers(caretakers.map(caretaker => caretaker.id === editingCaretaker.id ? editingCaretaker : caretaker));
    }
    setEditingCaretaker(null);
  };

  const handleDeleteCaretaker = (caretakerId: string) => {
    setCaretakers(caretakers.filter(caretaker => caretaker.id !== caretakerId));
  };

  const filteredCaretakers = caretakers.filter(
    caretaker => caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 caretaker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-4 ml-16 h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-300">Manage Caretakers</h1>
        <div className="relative w-full sm:w-64 mb-4">
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search caretakers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleAddCaretaker}>
          <Plus size={16} className="mr-1" />
          Add Caretaker
        </button>
      </div>
      {showForm && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold text-gray-300 mb-4">Add New Caretaker</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={newCaretaker.name}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={newCaretaker.email}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={newCaretaker.phone}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors mr-2" onClick={handleSaveNewCaretaker}>
                Save
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden h-[calc(100vh-200px)] w-[calc(100vw-400px)]">
        <div className="overflow-x-auto h-full">
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
                    {editingCaretaker?.id === caretaker.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editingCaretaker.name}
                        onChange={(e) => setEditingCaretaker({ ...editingCaretaker, name: e.target.value })}
                        className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-300">{caretaker.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCaretaker?.id === caretaker.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editingCaretaker.email}
                        onChange={(e) => setEditingCaretaker({ ...editingCaretaker, email: e.target.value })}
                        className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      <div className="text-sm text-gray-300">{caretaker.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCaretaker?.id === caretaker.id ? (
                      <input
                        type="text"
                        name="phone"
                        value={editingCaretaker.phone}
                        onChange={(e) => setEditingCaretaker({ ...editingCaretaker, phone: e.target.value })}
                        className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      <div className="text-sm text-gray-300">{caretaker.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{caretaker.patients}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingCaretaker?.id === caretaker.id ? (
                      <>
                        <button className="text-green-400 hover:text-green-500 mr-3" onClick={handleSaveCaretaker}>
                          <Save size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-500" onClick={() => setEditingCaretaker(null)}>
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="text-blue-400 hover:text-blue-500 mr-3" onClick={() => handleEditCaretaker(caretaker)}>
                          <Edit size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-500" onClick={() => handleDeleteCaretaker(caretaker.id)}>
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
