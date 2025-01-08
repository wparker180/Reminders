import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Reminders</h1>
        
        <form onSubmit={addTask} className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new reminder"
            className="task-input"
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="checkbox"
              />
              <span className={task.completed ? 'task-text completed' : 'task-text'}>
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App; 