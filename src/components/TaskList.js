import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, deleteTask, toggleCompleteTask }) => {
  return (
    <div>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <span 
              onClick={() => toggleCompleteTask(index)}
              style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer' 
              }}
            >
              {task.title} ({task.priority})
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
