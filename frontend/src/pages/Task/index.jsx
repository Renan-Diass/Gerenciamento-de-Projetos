////Chat preciso de ajuda para criar uma tela com uma lista de tarefas, onde cada tarefa pode ser marcada como concluída ou não. A tela deve permitir a criação de novas tarefas e a exclusão de tarefas existentes. Além disso, preciso que a aplicação seja capaz de salvar as tarefas no banco de dados. Como posso fazer isso? 
// Você pode começar criando um novo componente chamado Task. Este componente deve ter um estado local para armazenar a lista de tarefas, bem como funções para adicionar, excluir e marcar tarefas como concluídas.
//

// frontend/src/pages/Task/index.jsx
import React from 'react';
import { useState } from 'react';
import './styles.css';
import { createTask, deleteTask, getTasks, updateTask } from '../../api/task';

export default function Task() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    
    const loadTasks = async () => {
        const response = await getTasks();
        setTasks(response);
    };
    
    const handleAddTask = async () => {
        if (!newTask) {
        return;
        }
    
        await createTask({ description: newTask });
        setNewTask('');
        loadTasks();
    };
    
    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        loadTasks();
    };
    
    const handleToggleTask = async (task) => {
        await updateTask(task.id, { ...task, completed: !task.completed });
        loadTasks();
    };
    
    return (
        <div className="task-container">
        <h1>Lista de Tarefas</h1>
        <div className="task-form">
            <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nova tarefa"
            />
            <button onClick={handleAddTask}>Adicionar</button>
        </div>
        <ul className="task-list">
            {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
                <span>{task.description}</span>
                <div>
                <button onClick={() => handleToggleTask(task)}>
                    {task.completed ? 'Desfazer' : 'Concluir'}
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
    }