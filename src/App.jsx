import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Make sure to import your Tailwind CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
      toast.success("Task added successfully!");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast("❌ Task deleted successfully!", {
      className: 'bg-red-500 text-white',
      progressClassName: 'bg-white',
    });
  };

  const deleteAllTasks = () => {
    setTasks([]);
    toast("🗑️ All tasks deleted successfully!", {
      className: 'bg-orange-500 text-white',
      progressClassName: 'bg-white',
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">To-Do App</h1>
          <motion.button
            className={`p-2 rounded ${isDarkMode ? 'bg-violet-500 text-white' : 'bg-gray-800 text-white'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1, backgroundColor: "#4299e1" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>
        <div className="flex mb-4 flex-col sm:flex-row">
          <input
            type="text"
            className="border p-2 flex-grow mr-0 mb-2 sm:mr-2 sm:mb-0 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task"
          />
          <motion.button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={addTask}
            whileHover={{ scale: 1.1, backgroundColor: "#4299e1" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Add
          </motion.button>
        </div>
        <ul>
          <AnimatePresence>
            {tasks.map(task => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-600"
              >
                <span className="text-black dark:text-white">{task.text}</span>
                <div className="flex space-x-2">
                  <motion.button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => deleteTask(task.id)}
                    whileHover={{ scale: 1.1 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {tasks.length > 0 && (
          <motion.button
            className="bg-red-500 text-white p-2 rounded mt-4 w-full"
            onClick={deleteAllTasks}
            whileHover={{ scale: 1.1 }}
          >
            Delete All
          </motion.button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
