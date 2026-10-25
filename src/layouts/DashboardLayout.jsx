import { useState,useEffect } from "react";

import ProjectOverview from "../components/ProjectOverview";
import RightPanel from "../components/RightPanel";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import TaskOverView from "../components/TaskOverview";
import AddTaskModal from "../components/AddTaskModal";

const initialTasks = [
  {
    id: 1,
    title: "Design homepage",
    description: "Create the landing page UI",
    dueDate: "Nov 15, 2026",
    priority: "High",
    tag: "Design",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Build authentication",
    description: "Implement login and registration",
    dueDate: "Nov 18, 2026",
    priority: "Medium",
    tag: "Development",
    status: "To Do",
  },
  {
    id: 3,
    title: "Write documentation",
    description: "Document application features",
    dueDate: "Nov 20, 2026",
    priority: "Low",
    tag: "Documentation",
    status: "Completed",
  },
];

function DashboardLayout(){
    const [tasks ,setTasks]=useState(()=>{
        try{
            const savedTasks=localStorage.getItem("taskpilot-tasks");

            return savedTasks ? JSON.parse(savedTasks) : initialTasks;
        }
        catch{
            return initialTasks;
        }
    });

    const [isModalOpen,setIsModalOpen] =useState(false);

    const [editingTask, setEditingTask]=useState(null);

    const [activities, setActivities]=useState(()=>{
        try{
            const savedActivities= localStorage.getItem("taskpilot-activities");
            return savedActivities ? JSON.parse(savedActivities) : [];
        }
        catch {
            return [];
        }
    });

    useEffect(()=>{
        localStorage.setItem("taskpilot-tasks",JSON.stringify(tasks));
    },[tasks]);

    useEffect(()=>{
        localStorage.setItem("taskpilot-activities",JSON.stringify(activities));
    },[activities]);

    function addActivity(title,description, icon){
        const activity={
            id: Date.now() + Math.random(),
            title,
            description,
            icon,
            time: "just now"
        }
        setActivities((current)=>[activity,...current].slice(0,10));
    }

    function handleUpdateStatus(taskId, newStatus){
        const task=tasks.find((item)=>item.id===taskId);
    
        setTasks((currentTasks)=>
        currentTasks.map((item)=>
        item.id===taskId ? {...item, status: newStatus}: item));
        if(task&& task.status!==newStatus){
            addActivity("Task status changed",`${task.title} → ${newStatus}`, "↻");
        }
    }

    function handleEditTask(updatedTask){
        setTasks((currentTasks)=>
            currentTasks.map((task)=>
                task.id===updatedTask.id ? updatedTask : task)
        );
        addActivity("Task updated", updatedTask.title,"✎")
        setEditingTask(null);
    }

    function handleAddTask(newTask){
        setTasks((currentTasks)=>[newTask, ...currentTasks]);
        addActivity(
            "new task created",
            newTask.title,
            "+"
        );
    }

    function handleDeleteTask(taskId){
        const task =tasks.find((item)=>item.id===taskId);
        setTasks((currentTasks)=>
        currentTasks.filter((item)=> item.id!==taskId));
        if(task){
            addActivity("Task deleted", task.title,"×");
        }
    }

    return(
        <div className="app-background">
            <div className="dashboard-window">

                <Sidebar />

                <main className="main-content">
                    <header className="dashboard-header">
                        <div>
                            <h1>Dashboard</h1>
                            <p>Welcome back! Here's your workspace overview.</p>
                        </div>
                        <button className="add-task-button" type="button"
                                onClick={()=> setIsModalOpen(true)}
                        >
                            + Add Task
                        </button>
                    </header>

                    <SummaryCards tasks={tasks}/>

                    <ProjectOverview/>

                    <TaskOverView tasks={tasks} 
                        onDeleteTask={handleDeleteTask}
                        onEditTask={setEditingTask}
                        onUpdateStatus={handleUpdateStatus}/>

                </main>

                <RightPanel tasks={tasks} activities={activities}/>

            </div>
            {(isModalOpen || editingTask) && (
                <AddTaskModal 
                    key={editingTask?.id ?? "new-task"}
                    existingTask={editingTask}
                    onClose={()=>{
                        setIsModalOpen(false);
                        setEditingTask(null);
                    }}
                    onAddTask={editingTask ? handleEditTask : handleAddTask}
                />
            )}
        </div>
    )
}

export default DashboardLayout;