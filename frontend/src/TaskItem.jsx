// src/TaskItem.jsx
import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaEdit, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onToggleComplete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        onUpdate(task.id, editedTitle, editedDescription);
        setIsEditing(false);
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <span
                    className={`task-icon ${task.completed ? 'heartbeat' : ''}`}
                    onClick={() => onToggleComplete(task.id)}
                >
                    {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
                </span>
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                        <button onClick={handleSave}>Guardar</button>
                    </div>
                ) : (
                    <div className="task-details">
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p className="task-date">
                            Creada el: {new Date(task.createdAt).toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
            <div className="task-actions">
                <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
                    <FaEdit />
                </button>
                <button className="delete-button" onClick={() => onDelete(task.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;