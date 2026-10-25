import { useState,useEffect } from "react";

import ProjectOverview from "../components/ProjectOverview";
import RightPanel from "../components/RightPanel";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import TaskOverView from "../components/TaskOverview";
import AddTaskModal from "../components/AddTaskModal";
import TaskDetailsModal from "../components/TaskDetailsModal";
import TaskCalendar from "../components/TaskCalendar";
import NotificationsPage from "../components/NotifictionsPage";
import InboxPage from "../components/InboxPage";
import IntegrationsPage from "../components/IntegrationsPage";
import SettingsPage from "../components/SettingsPage";

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

    const [viewingTask, setViewingTask]=useState(null);

    const [activeView, setActiveView]=useState("Dashboard")

    const [notifications, setNotifications] = useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem("taskpilot-notifications")
        ) ?? [];
      } catch {
        return [];
      }
    });

    const defaultSettings = {
      fullName: "Suresh",
      email: "",
      workspace: "Personal workspace",
      theme: "light",
      compactMode: false,
      defaultPriority: "Medium",
      defaultStatus: "To Do",
    };

    const [settings, setSettings]=useState(()=>{
        try{
            const saved =localStorage.getItem("taskpilot-settings");
            return saved ?{...defaultSettings, ...JSON.parse(saved)}
            : defaultSettings;
        }
        catch{
            return defaultSettings;
        }
    });

    const unreadNotificationCount=notifications.filter(
        (notification)=>!notification.read
    ).length;

    useEffect(()=>{
        localStorage.setItem(
            "taskpilot-notifications",
            JSON.stringify(notifications)
        );
    },[notifications]);

    useEffect(()=>{
        localStorage.setItem("taskpilot-tasks",JSON.stringify(tasks));
    },[tasks]);

    useEffect(()=>{
        localStorage.setItem("taskpilot-activities",JSON.stringify(activities));
    },[activities]);

    useEffect(() => {
      document.documentElement.setAttribute(
        "data-theme",
        settings.theme || "light"
      );
    }, [settings.theme]);

    useEffect(()=>{
        document.documentElement.classList.toggle(
            "compact-mode",
            settings.compactMode===true
        );
    },[settings.compactMode]);

    function addActivity(title,description, icon,taskId=null){

        const id=Date.now()+Math.random();

        const activity={
            id,
            title,
            description,
            icon,
            time: "just now"
        }
        const notification ={
            ...activity,
            taskId,
            read: false,
        };

        setActivities((current)=>
            [activity,...current].slice(0,10));

        setNotifications((current)=>
        [notification, ...current].slice(0, 50)
        );
    }

    function handleUpdateStatus(taskId, newStatus){
        const task=tasks.find((item)=>item.id===taskId);
    
        setTasks((currentTasks)=>
        currentTasks.map((item)=>
        item.id===taskId ? {...item, status: newStatus}: item));

        if(task&& task.status!==newStatus){
            addActivity("Task status changed",`${task.title} → ${newStatus}`, "↻",task.id);
        }
    }

    function handleEditTask(updatedTask){
        setTasks((currentTasks)=>
            currentTasks.map((task)=>
                task.id===updatedTask.id ? updatedTask : task)
        );
        addActivity("Task updated", updatedTask.title,"✎", updatedTask.id)
        setEditingTask(null);
    }

    function handleAddTask(newTask){
        setTasks((currentTasks)=>[newTask, ...currentTasks]);
        addActivity(
            "new task created",
            newTask.title,
            "+",
            newTask.id
        );
    }

    function handleDeleteTask(taskId){
        const task =tasks.find((item)=>item.id===taskId);
        setTasks((currentTasks)=>
        currentTasks.filter((item)=> item.id!==taskId));
        if(task){
            addActivity("Task deleted", task.title,"×",task.id);
        }
    }
    const pageContent={
        Dashboard: {
            title: "Dashboard",
            subtitle: "Welcome back! Here's your workspace overview.",
        },
        Tasks: {
        title: "All Tasks",
          subtitle: "Search, organize, and manage all your tasks.",
        },
        Calendar: {
          title: "Calendar",
          subtitle: "View and manage tasks by their due dates.",
        },
        Notifications: {
          title: "Notifications",
          subtitle: "Stay updated on your recent activity.",
        },
        Inbox: {
          title: "Inbox",
          subtitle: "Keep track of your messages and updates.",
        },
        Integrations: {
          title: "Integrations",
          subtitle: "Manage your connected tools.",
        },
        Settings: {
          title: "Settings",
          subtitle: "Customize your profile and workspace preferences.",
        },
    };

    const currentPage=pageContent[activeView] ?? pageContent.Dashboard;

    function handleMarkRead(notificationId) {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    }

    function handleMarkAllRead() {
      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    }

    function handleOpenNotificationTask(taskId) {
      const task = tasks.find((item) => item.id === taskId);

      if (task) {
        setViewingTask(task);
      }
    }

    return(
        <div className="app-background">
            <div className="dashboard-window">

                <Sidebar 
                    activeView={activeView}
                    onNavigate={setActiveView}
                    unreadNotificationCount={unreadNotificationCount}
                />

                <main className="main-content">
                    <header className="dashboard-header">
                        <div>
                            <h1>{currentPage.title}</h1>
                            <p>{currentPage.subtitle}</p>
                        </div>
                        <button className="add-task-button" type="button"
                                onClick={()=> setIsModalOpen(true)}
                        >
                            + Add Task
                        </button>
                    </header>
                    {activeView==="Dashboard" &&(
                        <>
                        <SummaryCards tasks={tasks}/>

                        <ProjectOverview/>

                        <TaskOverView 
                            tasks={tasks} 
                            onDeleteTask={handleDeleteTask}
                            onEditTask={setEditingTask}
                            onUpdateStatus={handleUpdateStatus}
                            onViewTask={setViewingTask}
                        />
                        </>
                    )}

                    {activeView === "Tasks" && (
                        <TaskOverView
                          tasks={tasks}
                          onDeleteTask={handleDeleteTask}
                          onEditTask={setEditingTask}
                          onUpdateStatus={handleUpdateStatus}
                          onViewTask={setViewingTask}
                        />
                    )}                  
                    {activeView==='Calendar' &&(
                        <TaskCalendar 
                            tasks={tasks}
                            onViewTask={setViewingTask}
                        />
                    )}

                    {activeView === "Notifications" && (
                      <NotificationsPage
                        notifications={notifications}
                        onMarkRead={handleMarkRead}
                        onMarkAllRead={handleMarkAllRead}
                        onOpenTask={handleOpenNotificationTask}
                      />
                    )}

                    {activeView==="Inbox" && <InboxPage />}

                    {activeView ==="Integrations" && <IntegrationsPage />}

                    {activeView === "Settings" && <SettingsPage 
                            settings={settings}
                            onSettingsChange={setSettings}
                    />}
                
                </main>

                {activeView==="Dashboard" && (
                    <RightPanel tasks={tasks} activities={activities}/>
                )}


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
                    defaultPriority={settings.defaultPriority}
                    defaultStatus={settings.defaultStatus}
                />
            )}
            {viewingTask && (
                <TaskDetailsModal
                    task={tasks.find((item)=>item.id===viewingTask.id) ?? viewingTask}
                    onClose={()=> setViewingTask(null)}
                    onEdit={(task)=>{
                        setViewingTask(null);
                        setEditingTask(task);
                    }}
                />
            )}
        </div>
    )
}

export default DashboardLayout;