// app/dashboard/week/[id]/page.tsx
'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { useSearchParams } from 'next/navigation';

interface Entry {
  id: number;
  day: string;
  task: string;
  hours: number;
  project?: string;
}

interface WeekData {
  id: number;
  week: string;
  dateRange: string;
  entries: Entry[];
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: string, hours: number, day: string, project?: string) => boolean;
  editingTask?: Entry | null;
  selectedDay?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, editingTask, selectedDay }) => {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState<number>(0);
  const [project, setProject] = useState('Project Name');
  const [day, setDay] = useState(selectedDay || '');

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.task);
      setHours(editingTask.hours);
      setProject(editingTask.project || 'Project Name');
      setDay(editingTask.day);
    } else {
      setTask('');
      setHours(0);
      setProject('Project Name');
      setDay(selectedDay || '');
    }
  }, [editingTask, selectedDay]);

  const handleSave = () => {
  if (task.trim() && hours > 0 && day) {
    const isValid = onSave(task, hours, day, project);
    if (isValid) {
      onClose(); // ✅ only close modal if valid
    }
  } else {
    alert('Field missing'); // fallback if frontend validation fails
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {editingTask ? 'Edit Task' : 'Add New Entry'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Task *</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task description"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Hours *</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="0"
              min="0"
              step="0.5"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Project *</label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingTask ? 'Save Entry' : 'Add Entry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WeekDetailsPage(paramsPromise: { params: Promise<{ id: string }> }) {
  // Single array to maintain all entries
  const [entries, setEntries] = useState<Entry[]>([]);
  const [weekInfo, setWeekInfo] = useState<{ id: number; week: string; dateRange: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Entry | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  const { id } = React.use(paramsPromise.params);
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || '';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  function generateDayDates(startDateStr: string) {
    const startDate = new Date(startDateStr);
    const dayDates: Record<string, string> = {};

    days.forEach((day, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const formatted = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      dayDates[day] = formatted;
    });

    return dayDates;
  }

  const dayDates = useMemo(() => {
    const start = extractStartDate(range);
    return start ? generateDayDates(start) : {};
  }, [range]);

  function extractStartDate(range: string): string {
    const match = range.match(/\d{1,2} \w+,\s*\d{4}/);
    if (!match) return '';

    const rawDate = match[0];
    const isoDate = new Date(rawDate).toISOString().split('T')[0];
    return isoDate;
  }

  useEffect(() => {
    const fetchWeekData = async () => {
      try {
        const res = await fetch(`/api/week/${id}`);
        if (res.ok) {
          const data: Entry[] = await res.json();
          
          // API returns array of entries directly
          setEntries(data || []);
          
          // Set basic week info (you can customize this based on your needs)
          setWeekInfo({
            id: parseInt(id),
            week: `Week ${id}`,
            dateRange: range || 'Current Week'
          });
        }
      } catch (error) {
        console.error('Failed to load week data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekData();
  }, [id, range]);

  const handleAddTask = (
  task: string,
  hours: number,
  day: string,
  project?: string
): boolean => {
  if (!task || !day || hours === undefined || hours === null || !project) {
    alert('Field missing');
    return false;
  }

  if (totalHours + hours > 40) {
    alert('Total hours cannot exceed 40');
    return false;
  }

  setEntries(prev => [
    ...prev,
    {
      id: Date.now(), // or your preferred ID logic
      task,
      hours,
      day,
      project,
    },
  ]);

  return true;
};

  const toggleMenu = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === taskId ? null : taskId);
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };
  const handleEditTask = (task: string, hours: number, day: string, project?: string) => {
    if (!editingTask) return false;
    if (!task || !day || hours === undefined || hours === null || !project) {
    alert('Field missing');
    return false;
  }
   const otherTotal = entries
    .filter((entry) => entry.id !== editingTask.id)
    .reduce((sum, entry) => sum + entry.hours, 0);

  const updatedTotal = otherTotal + hours;

  if (updatedTotal > 40) {
    alert(`Total hours cannot exceed 40. Current: ${updatedTotal}`);
    return false;
  }
    // Update the specific entry in the single array
    setEntries(prevEntries => 
      prevEntries.map(entry =>
        entry.id === editingTask.id
          ? { ...entry, task, hours, day, project }
          : entry
      )
    );
    setEditingTask(null);
    return true;
  };

  const handleDeleteTask = (taskId: number) => {
    // Remove from the single array
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== taskId));
  };

  const openAddModal = (day: string) => {
    setSelectedDay(day);
    setEditingTask(null);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const openEditModal = (task: Entry) => {
    setEditingTask(task);
    setSelectedDay(task.day);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  // Calculate total hours from single array
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const progressPercent = Math.min((totalHours / 40) * 100, 100);

  // Group entries by day from single array - this automatically organizes data under correct days
  const entriesByDay = entries.reduce((acc, entry) => {
    if (!acc[entry.day]) {
      acc[entry.day] = [];
    }
    acc[entry.day].push(entry);
    return acc;
  }, {} as Record<string, Entry[]>);

  if (loading) return <p>Loading...</p>;
  if (!weekInfo) return <p>Week not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">This week's timesheet</h2>
            <div>
                <div className="flex items-center justify-end mb-2">
              {/* <span className="text-sm font-medium text-gray-700">{totalHours}/40 hrs</span> */}
              <span className="text-sm font-medium text-gray-700">{Math.round(progressPercent)}%</span>
            </div>
            <div className="relative group w-30">
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-orange-500 transition-all duration-300 rounded-lg"
                  style={{ width: `${progressPercent}%` }}
                ></div>
                 <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 bg-white-100 text-black text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {totalHours} / 40 hrs
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
              </div>
              
              {/* Tooltip */}
             
            </div>
            </div>

          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">{weekInfo.dateRange}</p>
            
            
            
            
          </div>

          <div className="space-y-6">
            {days.map((day) => (
              <div key={day} className=" flex pb-4 gap-4">
                <div className="flex items-center justify-between mb-3 w-20">
                  <h3 className="font-medium text-gray-900">{dayDates[day] || '—'}</h3>
                </div>
                
                <div className="space-y-2 w-full">
                  {/* Automatically display entries for this day */}
                  {entriesByDay[day]?.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 border-gray-300 border-1 rounded-lg">
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{entry.task}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">{entry.hours} hrs</span>
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {entry.project || 'Project Name'}
                        </button>
                        <div className="relative">
                          <button
                            onClick={(e) => toggleMenu(entry.id, e)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                              <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          {/* Dropdown menu */}
                          {openMenuId === entry.id && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <button
                                onClick={() => openEditModal(entry)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteTask(entry.id);
                                  closeMenu();
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>
                                <span>Delete</span>
                              </button>
                            </div>
                            )}
                      </div>
                      </div>
                    </div>
                  ))}
                  
                  {totalHours <40 && <button
                    onClick={() => openAddModal(day)}
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-100 transition-colors"
                  >
                    + Add new task
                  </button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editingTask ? handleEditTask : handleAddTask}
        editingTask={editingTask}
        selectedDay={selectedDay}
      />
    </div>
  );
}
