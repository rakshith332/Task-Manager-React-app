import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAddTask = () => {
    if (taskTitle) {
      addTask(taskTitle, priority);
      setTaskTitle('');
      setPriority('Low'); // Reset to default priority
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={taskTitle}
        onChange={handleInputChange}
        placeholder="Enter task"
      />
      <select value={priority} onChange={handlePriorityChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
