import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './TodoList.css';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTaskText, setEditedTaskText] = useState('');

    // Function to handle adding a new task
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask }]);
            setNewTask('');
        }
    };

    // Function to handle editing a task
    const editTask = (taskId, taskText) => {
        setEditTaskId(taskId);
        setEditedTaskText(taskText);
    };

    // Function to handle updating a task after editing
    const updateTask = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, text: editedTaskText };
            }
            return task;
        }));
        setEditTaskId(null);
        setEditedTaskText('');
    };

    // Function to handle deleting a task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="todo-list-container">
            <div className="todo-list-content">
                <h2 className="todo-list-header">To-Do List</h2>
                <div className="add-task-container">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="task-input"
                    />
                    <button onClick={addTask} className="add-button">Add Task</button>
                </div>
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {editTaskId === task.id ? (
                                        <input
                                            type="text"
                                            value={editedTaskText}
                                            onChange={(e) => setEditedTaskText(e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{task.text}</span>
                                    )}
                                </td>
                                <td className="action-icons">
                                    {editTaskId === task.id ? (
                                        <button onClick={() => updateTask(task.id)} className="save-button">Save</button>
                                    ) : (
                                        <>
                                            <FaEdit onClick={() => editTask(task.id, task.text)} className="edit-icon" />
                                            <FaTrash onClick={() => deleteTask(task.id)} className="delete-icon" />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodoList;