const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let tasks = []; 
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la lista de tareas');
});


app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send();
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});