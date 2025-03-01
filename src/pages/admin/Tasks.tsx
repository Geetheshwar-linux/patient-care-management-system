import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { format } from 'date-fns';

// Mock data

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  caretakerId: string;
}

interface Task {
  id: string;
  patientId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  prescription?: File | undefined; // Added prescription field
}


const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Alice Brown', age: 65, condition: 'Post-stroke recovery', caretakerId: '1' },
  { id: '2', name: 'Bob Wilson', age: 72, condition: 'Parkinson\'s disease', caretakerId: '1' },
  { id: '3', name: 'Carol Davis', age: 58, condition: 'Multiple sclerosis', caretakerId: '2' },
  { id: '4', name: 'David Miller', age: 80, condition: 'Alzheimer\'s disease', caretakerId: '2' },
  { id: '5', name: 'Eva Garcia', age: 45, condition: 'Spinal cord injury', caretakerId: '3' },
];

const MOCK_TASKS: Task[] = [
  { 
    id: '5', 
    patientId: '3', 
    title: 'Evening check-up', 
    description: 'Check vital signs and record in the system',
    dueDate: new Date(2025, 5, 15, 18, 0),
    status: 'pending',
    priority: 'medium'
  },
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

export const Tasks: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    patientId: '',
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    prescription: undefined as File | undefined // Initialize prescription
  });
  const [showForm, setShowForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    patientId: '',
    frequency: 'daily' as 'daily' | 'weekly',
    tasks: [{ title: '', description: '', time: '', priority: 'medium' }]
  });

  const filteredTasks = tasks.filter(
    task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {}

  const handleInputChange = (e: InputChangeEvent): void => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = (): void => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
      setShowScheduleForm(false);
    }
  };

  const handleAddSchedule = (): void => {
    if (showScheduleForm) {
      setShowScheduleForm(false);
    } else {
      setShowScheduleForm(true);
      setShowForm(false);
    }
  };

  const handleSaveNewTask = (): void => {
    if (newTask.title && newTask.patientId) {
      setTasks([...tasks, { ...newTask, id: String(tasks.length + 1), dueDate: new Date(newTask.dueDate), prescription: newTask.prescription || undefined }]);
      setNewTask({
        patientId: '',
        title: '',
        description: '',
        dueDate: '',
        status: 'pending',
        priority: 'medium',
        prescription: undefined // Reset prescription
      });
      setShowForm(false);
    }
  };

  const handleEditTask = (task: Task): void => {
    setEditingTask(task);
  };

  const handleSaveTask = (): void => {
    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string): void => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  const handleAddScheduleTask = () => {
    setNewSchedule({
      ...newSchedule,
      tasks: [...newSchedule.tasks, { title: '', description: '', time: '', priority: 'medium' }]
    });
  };

  const handleRemoveScheduleTask = (index: number) => {
    setNewSchedule({
      ...newSchedule,
      tasks: newSchedule.tasks.filter((_, i) => i !== index)
    });
  };

  const handleScheduleTaskChange = (index: number, field: string, value: string) => {
    setNewSchedule({
      ...newSchedule,
      tasks: newSchedule.tasks.map((task, i) => {
        if (i === index) {
          return { ...task, [field]: value };
        }
        return task;
      })
    });
  };

  const handleSaveSchedule = () => {
    // Convert schedule to individual tasks
    const scheduledTasks = newSchedule.tasks.map((task, index) => ({
      id: String(tasks.length + index + 1),
      patientId: newSchedule.patientId,
      title: task.title,
      description: task.description,
      dueDate: new Date(), // Set appropriate date based on schedule
      status: 'pending',
      priority: task.priority
    }));

    setTasks([...tasks, ...scheduledTasks]);
    setShowScheduleForm(false);
    setNewSchedule({
      patientId: '',
      frequency: 'daily',
      tasks: [{ title: '', description: '', time: '', priority: 'medium' }]
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const time = e.target.value;
    const date = new Date(`2000-01-01T${time}`);
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    handleScheduleTaskChange(index, 'time', formattedTime);
  };

  return (
    <div className="bg-gray-900 text-white p-4 ml-16 h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-300">Manage Tasks</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="w-64 pl-3 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`flex items-center px-4 py-2 ${
              showForm ? 'bg-gray-600' : 'bg-blue-600'
            } text-white rounded-md hover:bg-blue-700 transition-colors`}
            onClick={handleAddTask}
          >
            <Plus size={16} className="mr-2" />
            {showForm ? 'Close Form' : 'Add Task'}
          </button>
          <button 
            className={`flex items-center px-4 py-2 ${
              showScheduleForm ? 'bg-gray-600' : 'bg-green-600'
            } text-white rounded-md hover:bg-green-700 transition-colors`}
            onClick={handleAddSchedule}
          >
            <Plus size={16} className="mr-2" />
            {showScheduleForm ? 'Close Schedule' : 'Add Schedule'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-300 mb-4">Add New Task</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Patient</label>
              <select
                name="patientId"
                value={newTask.patientId}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Patient</option>
                {MOCK_PATIENTS.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
              <input
                type="datetime-local"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
                className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Doctor's Prescription</label>
              <input
                type="file"
                name="prescription"
                onChange={(e) => {
                  if (e.target.files) {
                    setNewTask({ ...newTask, prescription: e.target.files[0] });
                  }
                }}
                className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="col-span-2 flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={handleSaveNewTask}
              >
                Save Task
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showScheduleForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-300 mb-4">Create Schedule</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Patient</label>
              <select
                value={newSchedule.patientId}
                onChange={(e) => setNewSchedule({ ...newSchedule, patientId: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
              >
                <option value="">Select Patient</option>
                {MOCK_PATIENTS.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
              <select
                value={newSchedule.frequency}
                onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value as 'daily' | 'weekly' })}
                className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-300 mb-4">Schedule Tasks</h3>
              {newSchedule.tasks.map((task, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4 p-4 border border-gray-700 rounded-lg">
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={(e) => handleScheduleTaskChange(index, 'title', e.target.value)}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                  <input
                    type="time"
                    value={task.time}
                    onChange={(e) => handleTimeChange(e, index)}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                  <textarea
                    placeholder="Description"
                    value={task.description}
                    onChange={(e) => handleScheduleTaskChange(index, 'description', e.target.value)}
                    className="col-span-2 block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  />
                  <select
                    value={task.priority}
                    onChange={(e) => handleScheduleTaskChange(index, 'priority', e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button
                    onClick={() => handleRemoveScheduleTask(index)}
                    className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddScheduleTask}
                className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 mt-4"
              >
                Add Another Task
              </button>
            </div>

            <div className="col-span-2 flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleSaveSchedule}
              >
                Save Schedule
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => setShowScheduleForm(false)}
              >
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
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredTasks.map((task) => {
                const patient = MOCK_PATIENTS.find((p: Patient) => p.id === task.patientId);
                return (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTask?.id === task.id ? (
                        <input
                          type="text"
                          name="title"
                          value={editingTask.title}
                          onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-300">{task.title}</div>
                      )}
                      {editingTask?.id === task.id ? (
                        <input
                          type="text"
                          name="description"
                          value={editingTask.description}
                          onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">{task.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{patient?.name || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTask?.id === task.id ? (
                        <input
                          type="datetime-local"
                          name="dueDate"
                          value={format(new Date(editingTask.dueDate), "yyyy-MM-dd'T'HH:mm")}
                          onChange={(e) => setEditingTask({ ...editingTask, dueDate: new Date(e.target.value) })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-300">
                          {format(task.dueDate, 'MMM d, yyyy h:mm a')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTask?.id === task.id ? (
                        <select
                          name="priority"
                          value={editingTask.priority}
                          onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                          className="block w-full pl-2 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${task.priority === 'high' ? 'bg-red-200 text-red-900' : 
                            task.priority === 'medium' ? 'bg-yellow-200 text-yellow-900' : 
                            'bg-green-200 text-green-900'}`}>
                          {task.priority}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTask?.id === task.id ? (
                        <>
                          <button className="text-green-400 hover:text-green-500 mr-3" onClick={handleSaveTask}>
                            <Save size={16} />
                          </button>
                          <button className="text-red-400 hover:text-red-500" onClick={() => setEditingTask(null)}>
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="text-blue-400 hover:text-blue-500 mr-3" onClick={() => handleEditTask(task)}>
                            <Edit size={16} />
                          </button>
                          <button className="text-red-400 hover:text-red-500" onClick={() => handleDeleteTask(task.id)}>
                            <Trash2 size={16} />
                          </button>
                        </>
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
