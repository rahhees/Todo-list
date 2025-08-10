import React, { useEffect,useState } from 'react';


function App() {
 const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');


  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);




  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== '') {
      const task = { text: newTask, completed: false };
      setTasks([task,...tasks]);
      setNewTask('');
    }
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
     
  }

  function toggleComplete(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }
function handleDelete(){
  setNewTask('');
}

 function addTask() {
  if (newTask.trim() !== '') {
    const dueTime = Date.now() + 5 * 60 * 1000;
    const task = { text: newTask, completed: false, due: dueTime };
    setTasks([task, ...tasks]);
    setNewTask('');
  }
}


return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">

  <h1 className="text-5xl font-bold uppercase text-center text-gray-800 drop-shadow-sm mb-8">
   SET TODAY'S GOAL
  </h1>

<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-indigo-200">
   

    <div className="flex space-x-3 mb-6">
      <input
        type="text"
        id="todo-input"
        placeholder="Enter Your Task..."
        value={newTask}
        onChange={handleChange}
        className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={addTask}
        className="bg-indigo-700 text-white font-medium px-5 rounded-full hover:bg-indigo-800 shadow-md transition flex items-center space-x-2"
      >
 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        onClick={handleDelete}
        className="bg-gray-300 text-gray-700 font-medium px-5 rounded-full hover:bg-gray-400 shadow-sm transition flex items-center space-x-2"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <ol className="list-none space-y-3">
      {tasks.map((task, index) => (
        <li
          key={index}
          onClick={() => toggleComplete(index)}
          className={`relative flex justify-between items-center cursor-pointer rounded-md px-4 py-2 ${
            task.completed
              ? 'line-through text-gray-400 bg-gray-50'
              : 'hover:bg-indigo-50 text-gray-900'
          } transition`}
        >
   
          <span className="absolute left-4 font-semibold text-indigo-600 select-none">
            {index + 1}.
          </span>

   
          <span className="pl-8 flex-grow">{task.text}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              removeTask(index);
            }}
            className="text-red-600 font-semibold hover:text-red-800 transition flex items-center space-x-1"
          >
    
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
              />
            </svg>
          </button>
        </li>
      ))}
    </ol>
  </div>
</div>


  );
}

export default App;