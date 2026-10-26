import { useEffect , useState } from "react";

function TaskOverView({ tasks, onDeleteTask, onEditTask, onUpdateStatus, onViewTask, onViewAll, showViewAll=true }){

    const [searchTerm, setSearchTerm]=useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter,setPriorityFilter]=useState("All");
    const [sortBy, setSortBy]=useState("dueDate");
    const [sortOrder, setSortOrder]=useState("asecending");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

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

    const priorityRank={
        High: 1,
        Medium: 2,
        Low:3,
    };

    const sortedTasks=[...filteredTasks].sort((a,b)=>{
        let comparison=0;
        if(sortBy==="title"){
            comparison=(a.title ?? "").localeCompare(b.title ?? "");
        }
        else if(sortBy==="priority"){
            comparison=(priorityRank[a.priority] ?? 99) -(priorityRank[b.priority] ?? 99);
        }
        else if(sortBy==="dueDate"){
            const dateA=new Date(a.dueDate).getTime();
            const dateB=new Date(b.dueDate).getTime();
            comparison=
                (Number.isNaN(dateA) ? Infinity :dateA)-
                (Number.isNaN(dateB)? Infinity: dateB);
        }
        return sortOrder=== "ascending" ? comparison : -comparison; 
    })
    const totalPages=Math.ceil(sortedTasks.length/pageSize);
    const startIndex=(currentPage-1)*pageSize;

    const paginatedTasks=sortedTasks.slice(
        startIndex,
        startIndex+pageSize
    )

    useEffect(()=>{
        setCurrentPage(1);
    },[searchTerm,statusFilter,priorityFilter,sortBy,sortOrder,pageSize]);

    function handleClearFiltrs(){
        setSearchTerm("");
        setStatusFilter("All");
        setPriorityFilter("All");
        setSortBy("dueDate");
        setSortOrder("ascending");
        setCurrentPage(1);
    }
    function toggleTaskSelection(taskId) {
      setSelectedTaskIds((current) =>
        current.includes(taskId)
          ? current.filter((id) => id !== taskId)
          : [...current, taskId]
      );
    }

    function toggleSelectAll() {
      const visibleIds = paginatedTasks.map((task) => task.id);

      const allSelected =
        visibleIds.length > 0 &&
        visibleIds.every((id) => selectedTaskIds.includes(id));

      setSelectedTaskIds((current) =>
        allSelected
          ? current.filter((id) => !visibleIds.includes(id))
          : [...new Set([...current, ...visibleIds])]
      );
    }

    function handleBulkComplete() {
      selectedTaskIds.forEach((taskId) =>
        onUpdateStatus(taskId, "Completed")
      );

      setSelectedTaskIds([]);
    }

    function handleBulkDelete() {
      if (selectedTaskIds.length === 0) return;

      const confirmed = window.confirm(
        `Delete ${selectedTaskIds.length} selected task(s)?`
      );

      if (!confirmed) return;

      selectedTaskIds.forEach(onDeleteTask);
      setSelectedTaskIds([]);
    }
    
    return (
        <section  className="task-overview">
            <div className="section-heading">
                <div>
                    <h2>Tasks Overview</h2>
                    <p>Manage and track your recent tasks</p>
                </div>
                {showViewAll &&(
                    <button className="text-button" type="button" onClick={()=> onViewAll?.()}>
                        View all
                    </button>
                )}
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
                <select 
                    value={sortBy}
                    onChange={(event)=> setSortBy(event.target.value)}
                    aria-label="Sort tasks by"
                >
                    <option value="dueDate">Sort by due date</option>
                    <option value="title">Sort by title</option>
                    <option value="priority">Sort by priority</option>
                </select>
                <select 
                    value={sortOrder}
                    onChange={(event)=> setSortOrder(event.target.value)}
                    aria-label="Sort order"
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <button
                    type="button"
                    className="clear-filters-button"
                    onClick={handleClearFiltrs}
                >
                     ✕ Clear filters
                </button>
            </div>
            {selectedTaskIds.length > 0 && (
                <div className="bulk-actions">
                    <span>
                    {selectedTaskIds.length} selected
                    </span>
                
                    <button
                    type="button"
                    onClick={handleBulkComplete}
                    >
                    ✓ Mark completed
                    </button>
                
                    <button
                    type="button"
                    className="bulk-delete-button"
                    onClick={handleBulkDelete}
                    >
                    × Delete selected
                    </button>
                
                    <button
                    type="button"
                    onClick={() => setSelectedTaskIds([])}
                    >
                    Clear selection
                    </button>
                </div>
            )}
            <div className="task-table-wrapper">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>
                              <input
                                type="checkbox"
                                aria-label="Select all tasks on this page"
                                checked={
                                  paginatedTasks.length > 0 &&
                                  paginatedTasks.every((task) =>
                                    selectedTaskIds.includes(task.id)
                                  )
                                }
                                onChange={toggleSelectAll}
                              />
                            </th>
                            <th>Task</th>
                            <th>Due Date</th>
                            <th>priority</th>
                            <th>Tag</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTasks.length=== 0 &&(
                            <tr>
                                <td colSpan={6} className="empty-tasks">
                                    No tasks match your search or filters.
                                </td>
                            </tr>
                        )}
                        {paginatedTasks.map((task)=>(
                            <tr key={task.id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    aria-label={`Select ${task.title}`}
                                    checked={selectedTaskIds.includes(task.id)}
                                    onChange={() => toggleTaskSelection(task.id)}
                                  />
                                </td>
                                <td>
                                    <button 
                                        className="task-title-button"
                                        type="button"
                                        onClick={()=>onViewTask(task)}
                                    >
                                        {task.title}
                                    </button>
                                    <div className="task-description">{task.description}</div>
                                </td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <span
                                        className={`task-badge priority-${(task.priority ?? "Medium").toLowerCase()}`}
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
            <div className="pagination">
                <span className="pagination-info">
                  {sortedTasks.length === 0
                    ? "No tasks"
                    : `Showing ${startIndex + 1}-${Math.min(
                        startIndex + pageSize,
                        sortedTasks.length
                      )} of ${sortedTasks.length} tasks`}
                </span>
                <div className="pagination-controls">
                    <label htmlFor="pageSize">Rows:</label>
                    <select 
                        id="pageSize"
                        value={pageSize}
                        onChange={(event)=> setPageSize(Number(event.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <button
                        type="button"
                        disabled={currentPage<=1}
                        onClick={()=>setCurrentPage((page)=>page-1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {totalPages===0 ? 0 : currentPage} of {totalPages}
                    </span>
                    <button
                        type="button"
                        disabled={currentPage>=totalPages}
                        onClick={()=>setCurrentPage((page)=> page+1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    )
}

export default TaskOverView;