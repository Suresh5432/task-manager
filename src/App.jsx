
import { useState } from "react";
import AddTask from "./components/AddTask.jsx";
import TaskList from "./components/TaskList.jsx";

const initialTasks = [
  {
    id: 1,
    title: "Learn React components",
    completed: true,
    priority: "Low"
  },
  {
    id: 2,
    title: "Practice useState",
    completed: false,
    priority: "Medium"
  },
  {
    id: 3,
    title: "Build a task manager",
    completed: false,
    priority: "High"
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(newTask) {

    const duplicate = tasks.some(
      (task)=>
        task.title.toLowerCase()===newTask.title.trim().toLowerCase()
    );

    if (duplicate) {
      alert("this task already exists! ");
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,{
        id:crypto.randomUUID(),
        title:newTask.title,
        completed: false,
        priority: newTask.priority,},
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );
  }

  function deleteTasks(){
    setTasks([]);
  }

  return (
    <main className="container">
      <h1>Task Manager</h1>
      <p>Organize your work, one task at a time.</p>
      <AddTask onAddTask={addTask}/>
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} deleteTasks={deleteTasks}/>
    </main>
  );
}

export default App;
