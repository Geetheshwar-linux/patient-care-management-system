import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

// Mock data  
const MOCK_CARETAKERS: Caretaker[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    patients: 3,
    gender: 'male',
    dateOfBirth: '1980-01-01',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      zipCode: '12345',
      country: 'USA'
    },
    identificationNumber: 'A1234567',
    idType: 'passport',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Wife',
      phone: '+1234567890'
    },
    qualifications: ['BSc Nursing'],
    experience: '10 years',
    languages: ['English'],
    shift: 'morning',
    joiningDate: '2020-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    patients: 2,
    gender: 'female',
    dateOfBirth: '1985-05-15',
    address: {
      street: '456 Elm St',
      city: 'Othertown',
      state: 'Otherstate',
      zipCode: '67890',
      country: 'USA'
    },
    identificationNumber: 'B7654321',
    idType: 'driverLicense',
    emergencyContact: {
      name: 'John Smith',
      relation: 'Husband',
      phone: '+0987654321'
    },
    qualifications: ['MSc Nursing'],
    experience: '8 years',
    languages: ['English', 'Spanish'],
    shift: 'evening',
    joiningDate: '2019-05-15'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1122334455',
    patients: 1,
    gender: 'male',
    dateOfBirth: '1990-10-10',
    address: {
      street: '789 Oak St',
      city: 'Sometown',
      state: 'Somestate',
      zipCode: '54321',
      country: 'USA'
    },
    identificationNumber: 'C9876543',
    idType: 'nationalId',
    emergencyContact: {
      name: 'Emily Johnson',
      relation: 'Sister',
      phone: '+1122334455'
    },
    qualifications: ['Diploma in Nursing'],
    experience: '5 years',
    languages: ['English', 'French'],
    shift: 'night',
    joiningDate: '2021-10-10'
  }
];

interface Caretaker {
  id: string;
  name: string;
  email: string;
  phone: string;
  patients: number;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  identificationNumber: string;
  idType: 'passport' | 'driverLicense' | 'nationalId';
  idProofFile?: File;
  photo?: File;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  qualifications: string[];
  experience: string;
  languages: string[];
  shift: 'morning' | 'evening' | 'night';
  joiningDate: string;
}

export const Caretakers: React.FC = () => {
  const [caretakers, setCaretakers] = useState(MOCK_CARETAKERS);
  const [editingCaretaker, setEditingCaretaker] = useState<Caretaker | null>(null);
  const [newCaretaker, setNewCaretaker] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    identificationNumber: '',
    idType: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    qualifications: [''],
    experience: '',
    languages: [''],
    shift: '',
    joiningDate: '',
    idProofFile: undefined as File | undefined,
    photo: undefined as File | undefined
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setNewCaretaker({ ...newCaretaker, [name]: value });
  };


  const handleAddCaretaker = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  const handleSaveNewCaretaker = () => {
    setCaretakers([...caretakers, { ...newCaretaker, id: String(caretakers.length + 1), patients: 0, gender: newCaretaker.gender as 'male' | 'female' | 'other', idType: newCaretaker.idType as 'passport' | 'driverLicense' | 'nationalId', shift: newCaretaker.shift as 'morning' | 'evening' | 'night' }]);
    setNewCaretaker({
      name: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      identificationNumber: '',
      idType: '',
      emergencyContact: {
        name: '',
        relation: '',
        phone: ''
      },
      qualifications: [''],
      experience: '',
      languages: [''],
      shift: '',
      joiningDate: '',
      idProofFile: undefined as File | undefined,
      photo: undefined as File | undefined
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

  const handleFileUpload = (fieldName: 'idProofFile' | 'photo', file: File) => {
    setNewCaretaker(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleAddQualification = () => {
    setNewCaretaker(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }));
  };


  const filteredCaretakers = caretakers.filter(
    caretaker => caretaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 caretaker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-4 ml-16 h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-300">Manage Caretakers</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="w-64 pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
              placeholder="Search caretakers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`flex items-center px-3 py-1 ${
              showForm ? 'bg-gray-600' : 'bg-blue-600'
            } text-white rounded hover:bg-blue-700`}
            onClick={handleAddCaretaker}
          >
            <Plus size={16} className="mr-1" />
            {showForm ? 'Close Form' : 'Add Caretaker'}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-300 mb-4">Add New Caretaker</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-300 mb-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCaretaker.name}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Gender</label>
                  <select
                    name="gender"
                    value={newCaretaker.gender}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={newCaretaker.dateOfBirth}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileUpload('photo', e.target.files[0])}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-300 mb-3">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-300">Street Address</label>
                  <input
                    type="text"
                    name="address.street"
                    value={newCaretaker.address.street}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={newCaretaker.address.city}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                {/* Add other address fields similarly */}
              </div>
            </div>
            {/* Identification */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-300 mb-3">Identification</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">ID Type</label>
                  <select
                    name="idType"
                    value={newCaretaker.idType}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  >
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="driverLicense">Driver's License</option>
                    <option value="nationalId">National ID</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">ID Number</label>
                  <input
                    type="text"
                    name="identificationNumber"
                    value={newCaretaker.identificationNumber}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300">ID Proof Upload</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => e.target.files && handleFileUpload('idProofFile', e.target.files[0])}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-300 mb-3">Professional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Add dynamic qualification fields */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300">Qualifications</label>
                  {newCaretaker.qualifications.map((qual, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={qual}
                        onChange={(e) => {
                          const newQuals = [...newCaretaker.qualifications];
                          newQuals[index] = e.target.value;
                          setNewCaretaker({ ...newCaretaker, qualifications: newQuals });
                        }}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                      />
                      <button
                        type="button"
                        onClick={handleAddQualification}
                        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Shift Preference</label>
                  <select
                    name="shift"
                    value={newCaretaker.shift}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  >
                    <option value="">Select Shift</option>
                    <option value="morning">Morning (6 AM - 2 PM)</option>
                    <option value="evening">Evening (2 PM - 10 PM)</option>
                    <option value="night">Night (10 PM - 6 AM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={newCaretaker.joiningDate}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-300 mb-3">Emergency Contact</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={newCaretaker.emergencyContact.name}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Relation</label>
                  <input
                    type="text"
                    name="emergencyContact.relation"
                    value={newCaretaker.emergencyContact.relation}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Phone</label>
                  <input
                    type="text"
                    name="emergencyContact.phone"
                    value={newCaretaker.emergencyContact.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleSaveNewCaretaker}
              >
                Save Caretaker
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
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
                {filteredCaretakers.map((caretaker: Caretaker) => (
                <tr key={caretaker.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {editingCaretaker?.id === caretaker.id ? (
                    <input
                    type="text"
                    name="name"
                    value={editingCaretaker.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingCaretaker({ ...editingCaretaker, name: e.target.value })}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingCaretaker({ ...editingCaretaker, email: e.target.value })}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingCaretaker({ ...editingCaretaker, phone: e.target.value })}
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
