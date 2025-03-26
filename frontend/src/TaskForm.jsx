// src/TaskForm.jsx
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Importar el ícono

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setSuggestions(suggestTask(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description };

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(data => {
            onTaskAdded(data);
            setTitle('');
            setDescription('');
            setSuggestions([]);
        });
    };

    const handleSuggestionClick = (suggestion) => {
        setTitle(suggestion);
        setSuggestions([]);
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="input-container">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Título de la tarea"
 required
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción de la tarea"
                required
            />
            <button type="submit">
                <FaPlus /> Agregar Tarea
            </button>
        </form>
    );
};

const suggestTask = (input) => {
    const suggestions = [
        'Revisar el código en busca de errores',
        'Escribir pruebas unitarias',
        'Optimizar el rendimiento del código',
        'Documentar el proyecto',
        'Aprender un nuevo framework',
        'Estudiar TypeScript',
        'Practicar algoritmos y estructuras de datos',
        'Revisar pull requests',
        'Planificar el sprint semanal',
        'Actualizar dependencias del proyecto',
        'Crear un nuevo componente en React',
        'Diseñar la arquitectura de la aplicación',
        'Hacer una revisión de código',
        'Estudiar patrones de diseño',
        'Configurar CI/CD',
        'Automatizar tareas con scripts',
        'Hacer una pausa para estirarse',
        'Tomar agua y descansar la vista',
        'Organizar la bandeja de correo',
        'Revisar las tareas pendientes en Jira',
        'Estudiar sobre seguridad informática',
        'Hacer un backup de la base de datos',
        'Configurar un entorno de desarrollo local',
        'Investigar nuevas tecnologías',
        'Escribir un blog técnico',
        'Participar en un meetup de programación',
        'Revisar el código de un compañero',
        'Hacer una revisión de la documentación',
        'Planificar la próxima reunión de equipo',
        'Estudiar sobre DevOps',
    ];
    return suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(input.toLowerCase())
    );
};

export default TaskForm;