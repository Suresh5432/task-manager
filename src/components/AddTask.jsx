import { useState } from 'react';

function AddTask({ onAddTask }){
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Low");

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
        return;
        }

        onAddTask({
        title: trimmedTitle,
        priority: priority,
        });

        setTitle("");
        setPriority("Low");
    }
    return (
        <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Enter a task"
          aria-label="Task title"
        />
        <fieldset>
        <legend>Select Priority</legend>

        {["Low", "Medium", "High"].map((level) => (
          <label key={level}>
            <input
              type="radio"
              name="priority"
              value={level}
              checked={priority === level}
              onChange={(event) => setPriority(event.target.value)}
            />
            {level}
          </label>
        ))}
      </fieldset>
        <button type="submit">Add Task</button>
      </form>
    );
    
}

export default AddTask;