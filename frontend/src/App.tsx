// src/App.jsx
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { FaSearch } from 'react-icons/fa';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        toast.success('Tarea creada exitosamente');
    };

    const handleTaskUpdated = (id, updatedTitle, updatedDescription) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, title: updatedTitle, description: updatedDescription } : task
        );
        setTasks(updatedTasks);
        toast.success('Tarea actualizada exitosamente');
    };

    const handleTaskDeleted = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        toast.success('Tarea eliminada exitosamente');
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setSearchTerm('');
            window.location.reload();
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Gestor de Tareas</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar tareas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    {searchTerm === '' && <FaSearch className="search-icon" />}
                </div>
            </header>
            <main className="app-main">
                <div className="task-form-container">
                    <TaskForm onTaskAdded={handleTaskAdded} />
                </div>
                <div className="task-list-container">
                    <TaskList 
                        tasks={filteredTasks} 
                        onDelete={handleTaskDeleted} 
                        onUpdate={handleTaskUpdated} 
                    />
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default App;