function TaskList({tasks, toggleTask, deleteTask, deleteTasks}){

    return (
        <>
        {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span
                  className={
                    task.completed ? "completed" : ""
                  }
                >
                priority: {task.priority}
                <br/>
                {task.title}
                </span>
              </label>

              <button
                type="button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
      <p>
        Completed:{" "}
        {tasks.filter((task) => task.completed).length}
        {" / "}
        {tasks.length}
      </p>
      <p>
        Pending Tasks:{" "}
        {tasks.filter((task)=> !task.completed).length}
        {" / "}
        {tasks.length}
      </p>
      <button type="button" onClick={() => deleteTasks()}>
      Delete All
      </button>
      </div>
      </>
    );
}

export default TaskList;