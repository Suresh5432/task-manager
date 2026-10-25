import { useState } from "react";

function TaskOverView({tasks, onDeleteTask, onEditTask, onUpdateStatus}){
    const [searchTerm, setSearchTerm]=useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter,setPriorityFilter]=useState("All");

    const filteredTasks=tasks.filter((task)=>{
        const query=searchTerm.toLowerCase().trim();

        const matchesSearch=
            (task.title ?? "").toLowerCase().includes(query) ||
            (task.description ?? "").toLowerCase().includes(query) ||
            (task.tag ?? "").toLowerCase().includes(query);

        const matchesStatus=statusFilter==="All" || task.status ===statusFilter;

        const matchesPriority=priorityFilter==="All" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <section  className="task-overview">
            <div className="section-heading">
                <div>
                    <h2>Tasks Overview</h2>
                    <p>Manage and track your recent tasks</p>
                </div>
                <button className="text-button" type="button">
                    View all
                </button>
            </div>
            <div className="task-toolbar">
                <input
                    type="search"
                    className="task-search"
                    placeholder="Search tasks.."
                    value={searchTerm}
                    onChange={(event)=>setSearchTerm(event.target.value)}
                    aria-label="Search tasks"
                />
                <select
                    value={statusFilter}
                    onChange={(event)=> setStatusFilter(event.target.value)}
                    aria-label="Filter by status"
                >
                    <option value="All">All statuses</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(event)=> setPriorityFilter(event.target.value)}
                    aria-label="Filter by priority"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className="task-table-wrapper">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Due Date</th>
                            <th>priority</th>
                            <th>Tag</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.length=== 0 &&(
                            <tr>
                                <td colSpan={6} className="empty-tasks">
                                    No tasks match your search or filters.
                                </td>
                            </tr>
                        )}
                        {filteredTasks.map((task)=>(
                            <tr key={task.id}>
                                <td>
                                    <div className="task-name">{task.title}</div>
                                    <div className="task-description">{task.description}</div>
                                </td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <span
                                        className={`task-badge priorf.mapity-${(task.priority ?? "Medium").toLowerCase()}`}
                                    >
                                        {task.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className="task-tag">{task.tag}</span>
                                </td>
                                <td>
                                    <select
                                    className={`task-status-select status-${(task.status ?? "To Do")
                                        .toLowerCase()
                                        .replace(/\s+/g,"-")}`}
                                    value={task.status ?? "To Do"}
                                    onChange={(event)=> onUpdateStatus(task.id,event.target.value)}
                                    aria-label={`Update staus for ${task.title}`}
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="task-actions">
                                        <button
                                        type="button"
                                        aria-label={`Edit ${task.title}`}
                                        onClick={()=>onEditTask(task)}
                                        >
                                        ✎
                                        </button>
                                        <button  
                                        type="button"
                                        aria-label={`Delete ${task.title}`}
                                        onClick={()=> onDeleteTask(task.id)}
                                        >
                                        ×
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default TaskOverView;