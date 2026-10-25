function AddTaskModal({ onClose, onAddTask, existingTask}){

    const isEditing=Boolean(existingTask);

    function handleSubmit(event){
        event.preventDefault();

        const formData= new FormData(event.currentTarget);

         const task = {
            id: existingTask?.id ?? Date.now(),
            title: formData.get("title").trim(),
            description: formData.get("description").trim(),
            dueDate: formData.get("dueDate"),
            priority: formData.get("priority"),
            tag: formData.get("tag").trim(),
            status: existingTask?.status ?? "To Do",
        };

        onAddTask(task);
        onClose();
    }

    function toDateInputValue(date){
        if(!date) return "";

        const parseDate =new Date(date);

        if(Number.isNaN(parseDate.getTime())) return date;
        
        const year=parseDate.getFullYear();
        const month=String(parseDate.getMonth()+1).padStart(2,"0");
        const day=String(parseDate.getDate()).padStart(2,"0");

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <section
                className="task-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(event)=>event.stopPropagation()}
            >
                <div className="modal-header">
                    <div>
                        <h2 id="modal-title">
                            {isEditing ? "Edit Task ": "Create New Task"}
                        </h2>
                        <p>
                            {isEditing ? "Update your task details":
                            "Add a task to your workspace."}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Task Title</label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={existingTask ?.title ?? ""}
                        placeholder="Enter task title"
                        required
                        maxLength={100}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={existingTask?.description ?? ""}
                        placeholder="Describe your task"
                        rows={3}
                        required
                        maxLength={500}
                    />
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        defaultValue={toDateInputValue(existingTask?.dueDate)}
                        required
                    />
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        defaultValue={existingTask?.priority?? "Medium"}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <label htmlFor="tag">Category / Tag</label>
                    <input
                        id="tag"
                        name="tag"
                        defaultValue={existingTask?.tag ?? ""}
                        placeholder="e.g. Design, Development"
                        required
                        maxLength={50}
                    />
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="add-task-button">
                            {isEditing ? "Save Changes" : "Create Task"} 
                        </button>
                    </div>
                </form>
            </section>

        </div>
    );
}

export default AddTaskModal;