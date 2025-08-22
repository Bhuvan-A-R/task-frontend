import { useState, useEffect, use } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const getTasks = async () => {
    const response = await axios.get(`${VITE_API_URL}/api/tasks`);
    setData(response.data);
  };

  const createTask = async () => {
    if (!title) return;
    await axios.post(`${VITE_API_URL}/api/tasks`, { title });
    setTitle("");
    getTasks();
  };

  const updateTask = async (id, updatedTitle) => {
    const response = await axios.put(`${VITE_API_URL}/api/tasks/${id}`, {
      title: updatedTitle,
    });
    setData(data.map((task) => (task._id === id ? response.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${VITE_API_URL}/api/tasks/${id}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={createTask}>Add Task</button>
      <ul>
        {data.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
