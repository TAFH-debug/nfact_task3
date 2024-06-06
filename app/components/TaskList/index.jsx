'use client'
import TaskItem from "@/app/components/TaskItem";
import {useEffect, useState} from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [state, setState] = useState({
    value: "",
    lastId: 0,
    filter: "all",
  });

  const handleAddTask = () => {
    const newTasks = [...tasks, {
      id: state.lastId + 1,
      text: state.value,
      completed: false
    }];

    setTasks(newTasks)
    setState({
      value: "",
      lastId: state.lastId + 1,
      filter: state.filter
    })
    localStorage.setItem("id", JSON.stringify(state.lastId + 1));
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const clearCompletedTasks = () => {
    const newTasks = tasks.filter(task => !task.completed);
    setTasks(
        newTasks
    )
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  const check = (compl, filter) => {
    return (compl && filter === 'active') || (!compl && filter === 'completed')
  }

  const handleToggleTask = (id) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(
        newTasks
    )
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(
        newTasks
    )
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  useEffect(() => {
    const lTasks = JSON.parse(localStorage.getItem("tasks"));
    const lastId = JSON.parse(localStorage.getItem("id"));
    setTasks(lTasks);
    setState({
      value: "",
      filter: "all",
      lastId: lastId
    })
  }, [])

  return (
      <div className="container mx-auto p-4 min-h-screen">
        <div className="mb-4 flex items-center">
          <input
              type="text"
              className="bg-gray-800 text-white border-none rounded p-4 flex-grow focus:outline-none"
              placeholder="What to do ?"
              onChange={(e) => {
                setState({
                  ...state,
                  value: e.target.value
                });
              }}
          />
          <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white p-4 rounded ml-4"
          >
            Add Task
          </button>
        </div>
        <div className="bg-gray-300 rounded p-4 dark:bg-gray-800">
          <ul>
            {
              tasks.map((task) => (
                  check(task.completed, state.filter) ?
                      <></> :
                  <TaskItem key={task.id}
                            id={task.id}
                            text={task.text}
                            completed={task.completed}
                            handleTog={handleToggleTask}
                            handleDel={handleDeleteTask}

                  />
              ))
            }
          </ul>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            <span> {tasks.filter(task => !check(task.completed, state.filter)).length} items left</span>
            <div>
              <button onClick={() => setState({...state, filter: 'all'})} className={`mr-2 ${state.filter === 'all' ? 'text-white' : ''}`}>All</button>
              <button onClick={() => setState({...state, filter: 'active'})} className={`mr-2 ${state.filter === 'active' ? 'text-white' : ''}`}>Active</button>
              <button onClick={() => setState({...state, filter: 'completed'})} className={`${state.filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
            </div>
            <button
                onClick={() => clearCompletedTasks()}
                className="text-gray-400 hover:text-white"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
  );
}
