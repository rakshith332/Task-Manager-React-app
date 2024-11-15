import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority) => {
    setTasks([...tasks, { title, priority, completed: false }]);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleCompleteTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortTasks = (tasks) => {
    if (sortOption === 'priority') {
      return [...tasks].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortOption === 'completion') {
      return [...tasks].sort((a, b) => a.completed - b.completed);
    }
    return tasks;
  };

  const sortedAndFilteredTasks = sortTasks(
    tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskInput addTask={addTask} />

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Sorting Buttons */}
      <button onClick={() => setSortOption('priority')}>Sort by Priority</button>
      <button onClick={() => setSortOption('completion')}>Sort by Completion</button>

      <TaskList tasks={sortedAndFilteredTasks} deleteTask={deleteTask} toggleCompleteTask={toggleCompleteTask} />
    </div>
  );
};

export default App;
