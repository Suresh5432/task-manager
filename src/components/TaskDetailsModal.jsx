function TaskDetailsModal({ task, onClose, onEdit }){
    if (!task) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <section
                className="task-modal task-details-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="task-details-titel"
                onClick={(event)=> event.stopPropagation()}
            >
                <div className="modal-header">
                    <div>
                        <h2 id="task-details-title">Task Details</h2>
                        <p>Review your task information</p>
                    </div>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close task details"
                    >
                        ×
                    </button>
                </div>
                <h3 className="details-task-title">{task.title}</h3>
                <p className="details-task-description">
                    {task.description || "No description provided."}
                </p>
                <div className="task-details-grid">
                    <div className="task-detail-item">
                        <span>Due Date</span>
                        <strong>{task.dueDate || "Not set"}</strong>
                    </div>
                    <div className="task-detail-item">
                        <span>Priority</span>
                        <strong>{task.priority || "Medium"}</strong>
                    </div>
                    <div className="task-detail-item">
                        <span>Category</span>
                        <strong>{task.tag || "Uncategorized"}</strong>
                    </div>
                    <div className="task-detail-item">
                        <span>Status</span>
                        <strong>{task.status || "To Do"}</strong>
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="add-task-button"
                        onClick={()=> onEdit(task)}
                    >
                        Edit Task
                    </button>
                </div>
            </section>
        </div>
    )
}

export default TaskDetailsModal;