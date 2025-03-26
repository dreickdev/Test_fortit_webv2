// src/TaskList.jsx
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import ConfirmationModal from './ConfirmationModal';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleDelete = (id) => {
        setTaskToDelete(id);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            onDelete(taskToDelete);
            setModalOpen(false);
            setTaskToDelete(null);
        }
    };

    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onUpdate={onUpdate}
                />
            ))}
            <ConfirmationModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onConfirm={confirmDelete} 
                message={`¿Estás seguro de que deseas eliminar la tarea "${taskToDelete ? tasks.find(t => t.id === taskToDelete).title : ''}"?`}
            />
        </div>
    );
};

export default TaskList;