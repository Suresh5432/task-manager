
import { useState } from "react";

function AddProjectModal({ onClose, onAddProject }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#7667F8");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    onAddProject({
      id: crypto.randomUUID(),
      name: trimmedName,
      description: description.trim(),
      color,
      deadline,
    });

    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="add-project-title">Create Project</h2>
          <button type="button" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="project-name">Project name *</label>
          <input
            id="project-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Website Redesign"
            required
            maxLength={80}
            autoFocus
          />

          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What is this project about?"
            rows={3}
            maxLength={300}
          />

          <label htmlFor="project-color">Project color</label>
          <input
            id="project-color"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />

          <label htmlFor="project-deadline">Deadline</label>
          <input
            id="project-deadline"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProjectModal;
