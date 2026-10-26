import { useState } from "react";

function toDateInputValue(date) {
  if (!date) return "";

  // Already in the format expected by an HTML date input
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function AddTaskModal({ onClose, onAddTask, existingTask, projects=[], defaultPriority="Medium", defaultStatus="To Do"}){

    const isEditing=Boolean(existingTask);

    const [formData, setFormData] = useState({
      title: existingTask?.title ?? "",
      description: existingTask?.description ?? "",
      dueDate: toDateInputValue(existingTask?.dueDate),
      priority: existingTask?.priority ?? defaultPriority,
      tag: existingTask?.tag ?? "",
      status: existingTask?.status ?? defaultStatus,
      projectId: existingTask?.projectId ?? "",
    });

    function handleChange(event){
        const { name, value }= event.target;

        setFormData((current)=>({
            ...current,[name]: value,
        }));
    }

    function handleSubmit(event){
        event.preventDefault();

         const task = {
            id: existingTask?.id ?? Date.now(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            dueDate: formData.dueDate,
            priority: formData.priority,
            tag: formData.tag.trim(),
            status: formData.status,
            projectId: formData.projectId || null,
        };

        onAddTask(task);
        onClose();
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
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                        maxLength={100}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <label htmlFor="tag">Category / Tag</label>
                    <input
                        id="tag"
                        name="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        placeholder="e.g. Design, Development"
                        required
                        maxLength={50}
                    />
                    <label htmlFor="projectId">Project</label>
                    <select
                        id="projectId"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleChange}
                    >
                        <option value="">No project</option>

                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                    
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