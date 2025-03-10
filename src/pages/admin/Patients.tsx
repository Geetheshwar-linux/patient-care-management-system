import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

// Mock data
const MOCK_CARETAKERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', patients: 3 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', patients: 2 },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1122334455', patients: 1 },
];

interface PatientDocuments {
  prescriptions: File[];
  caseSheets: File[];
  labReports: File[];
  otherDocuments: File[];
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  caretakerId: string;
  familyContact: string;
  familyRelation: string;
  familyPhone: string;
  documents?: PatientDocuments;
}

const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Alice Brown', age: 65, condition: 'Post-stroke recovery', caretakerId: '1', familyContact: 'Bob Brown', familyRelation: 'Son', familyPhone: '+1234567890' },
  { id: '2', name: 'Bob Wilson', age: 72, condition: 'Parkinson\'s disease', caretakerId: '1', familyContact: 'Alice Wilson', familyRelation: 'Daughter', familyPhone: '+0987654321' },
  { id: '3', name: 'Carol Davis', age: 58, condition: 'Multiple sclerosis', caretakerId: '2', familyContact: 'David Davis', familyRelation: 'Husband', familyPhone: '+1122334455' },
  { id: '4', name: 'David Miller', age: 80, condition: 'Alzheimer\'s disease', caretakerId: '2', familyContact: 'Eva Miller', familyRelation: 'Wife', familyPhone: '+2233445566' },
  { id: '5', name: 'Eva Garcia', age: 45, condition: 'Spinal cord injury', caretakerId: '3', familyContact: 'Carlos Garcia', familyRelation: 'Brother', familyPhone: '+3344556677' },
];

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
    caretakerId: '',
    familyContact: '',
    familyRelation: '',
    familyPhone: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [caretakerSearchTerm, setCaretakerSearchTerm] = useState('');
  const [selectedPatientDocs, setSelectedPatientDocs] = useState<PatientDocuments>({
    prescriptions: [],
    caseSheets: [],
    labReports: [],
    otherDocuments: []
  });

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {}

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  const handleSaveNewPatient = () => {
    setPatients([...patients, { ...newPatient, id: String(patients.length + 1), age: Number(newPatient.age) }]);
    setNewPatient({
      name: '',
      age: '',
      condition: '',
      caretakerId: '',
      familyContact: '',
      familyRelation: '',
      familyPhone: ''
    });
    setShowForm(false);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleSavePatient = () => {
    if (editingPatient) {
      setPatients(patients.map(patient => patient.id === editingPatient.id ? editingPatient : patient));
    }
    setEditingPatient(null);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
  };

  const handleDocumentUpload = (type: keyof PatientDocuments, files: FileList | null) => {
    if (files) {
      setSelectedPatientDocs(prev => ({
        ...prev,
        [type]: [...prev[type], ...Array.from(files)]
      }));
    }
  };

  const renderDocumentsSection = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-gray-300 mb-4">Patient Documents</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prescriptions</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleDocumentUpload('prescriptions', e.target.files)}
            className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
            accept=".pdf,.jpg,.png"
          />
          {selectedPatientDocs.prescriptions.map((file, index) => (
            <div key={index} className="text-sm text-gray-400 mt-1">{file.name}</div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Case Sheets</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleDocumentUpload('caseSheets', e.target.files)}
            className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
            accept=".pdf,.doc,.docx"
          />
          {selectedPatientDocs.caseSheets.map((file, index) => (
            <div key={index} className="text-sm text-gray-400 mt-1">{file.name}</div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Lab Reports</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleDocumentUpload('labReports', e.target.files)}
            className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
            accept=".pdf,.jpg,.png"
          />
          {selectedPatientDocs.labReports.map((file, index) => (
            <div key={index} className="text-sm text-gray-400 mt-1">{file.name}</div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Other Documents</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleDocumentUpload('otherDocuments', e.target.files)}
            className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
          />
          {selectedPatientDocs.otherDocuments.map((file, index) => (
            <div key={index} className="text-sm text-gray-400 mt-1">{file.name}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCaretakers = MOCK_CARETAKERS.filter(
    caretaker => caretaker.name.toLowerCase().includes(caretakerSearchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-4 ml-16 h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-300">Manage Patients</h1>
        <button 
          className={`flex items-center px-3 py-1 ${
            showForm ? 'bg-gray-600' : 'bg-blue-600'
          } text-white rounded hover:bg-blue-700`} 
          onClick={handleAddPatient}
        >
          <Plus size={16} className="mr-1" />
          {showForm ? 'Close Form' : 'Add Patient'}
        </button>
      </div>
      {showForm && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold text-gray-300 mb-4">Add New Patient</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Age</label>
              <input
                type="number"
                name="age"
                value={newPatient.age}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Condition</label>
              <input
                type="text"
                name="condition"
                value={newPatient.condition}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Caretaker</label>
              <input
                type="text"
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                placeholder="Search caretakers..."
                value={caretakerSearchTerm}
                onChange={(e) => setCaretakerSearchTerm(e.target.value)}
              />
              <select
                name="caretakerId"
                value={newPatient.caretakerId}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Caretaker</option>
                {filteredCaretakers.map(caretaker => (
                  <option key={caretaker.id} value={caretaker.id}>{caretaker.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Family Contact</label>
              <input
                type="text"
                name="familyContact"
                value={newPatient.familyContact}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Family Relation</label>
              <input
                type="text"
                name="familyRelation"
                value={newPatient.familyRelation}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Family Phone</label>
              <input
                type="text"
                name="familyPhone"
                value={newPatient.familyPhone}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {renderDocumentsSection()}
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors mr-2" onClick={handleSaveNewPatient}>
                Save
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="relative w-full sm:w-64 mb-6">
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden h-[calc(100vh-200px)] w-[calc(100vw-400px)]">
        <div className="overflow-x-auto h-full">
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
                  Family Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Family Relation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Family Phone
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
                      {editingPatient?.id === patient.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editingPatient.name}
                          onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-300">{patient.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingPatient?.id === patient.id ? (
                        <input
                          type="number"
                          name="age"
                          value={editingPatient.age}
                          onChange={(e) => setEditingPatient({ ...editingPatient, age: Number(e.target.value) })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">{patient.age}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingPatient?.id === patient.id ? (
                        <input
                          type="text"
                          name="condition"
                          value={editingPatient.condition}
                          onChange={(e) => setEditingPatient({ ...editingPatient, condition: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">{patient.condition}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{caretaker?.name || 'Unassigned'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingPatient?.id === patient.id ? (
                        <input
                          type="text"
                          name="familyContact"
                          value={editingPatient.familyContact}
                          onChange={(e) => setEditingPatient({ ...editingPatient, familyContact: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">{patient.familyContact}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingPatient?.id === patient.id ? (
                        <input
                          type="text"
                          name="familyRelation"
                          value={editingPatient.familyRelation}
                          onChange={(e) => setEditingPatient({ ...editingPatient, familyRelation: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">{patient.familyRelation}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingPatient?.id === patient.id ? (
                        <input
                          type="text"
                          name="familyPhone"
                          value={editingPatient.familyPhone}
                          onChange={(e) => setEditingPatient({ ...editingPatient, familyPhone: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">{patient.familyPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingPatient?.id === patient.id ? (
                        <React.Fragment>
                          <button className="text-green-400 hover:text-green-500 mr-3" onClick={handleSavePatient}>
                            <Save size={16} />
                          </button>
                          <button className="text-red-400 hover:text-red-500" onClick={() => setEditingPatient(null)}>
                            <X size={16} />
                          </button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <button className="text-blue-400 hover:text-blue-500 mr-3" onClick={() => handleEditPatient(patient)}>
                            <Edit size={16} />
                          </button>
                          <button className="text-red-400 hover:text-red-500" onClick={() => handleDeletePatient(patient.id)}>
                            <Trash2 size={16} />
                          </button>
                        </React.Fragment>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};