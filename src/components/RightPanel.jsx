import { getTaskStats } from "../utils/taskUtils";

function RightPanel({ tasks, activities, onViewAll }){

    const stats = getTaskStats(tasks);

    const progress = [
    {
      label: "Completed",
      count: stats.completed,
      color: "completed",
    },
    {
      label: "In Progress",
      count: stats.inProgress,
      color: "in-progress",
    },
    {
      label: "To Do",
      count: stats.toDo,
      color: "todo",
    },
  ];

  const totalTasks= stats.total;

  const completionPercentage= stats.completionPercentage;

  return (
    <aside className="right-panel">
        <section className="panel-card">
            <h2>Task Progress</h2>
            <p className="panel-subtitle">Your overall productivity</p>
            
            <div
              className="progress-circle"
              style={{
                "--completed": `${
                  totalTasks ? (stats.completed / totalTasks) * 100 : 0
                }%`,
                "--in-progress": `${
                  totalTasks ? (stats.inProgress / totalTasks) * 100 : 0
                }%`,
                "--todo": `${
                  totalTasks ? (stats.toDo / totalTasks) * 100 : 0
                }%`,
              }}
              role="img"
              aria-label={`${stats.completed} completed, ${stats.inProgress} in progress, ${stats.toDo} to do`}
            >
              <div className="progress-circle-inner">
                <strong>{completionPercentage}%</strong>
                <span>Completed</span>
              </div>
            </div>

            <div className="progress-list">
                {progress.map((item)=>{
                    const percentage =
                                totalTasks === 0
                                ? 0
                                : Math.round((item.count / totalTasks) * 100);
                    return (
                        <div className="progress-item" key={item.color}>
                            <div className="progress-item-heading">
                                <span>
                                    <i className={`progress-dot ${item.color}`}/>
                                    {item.label}
                                </span>
                                <strong>{item.count}</strong>
                            </div> 
                            <div className="mini-progress-track">
                                <div 
                                    className={`mini-progress-fill ${item.color}`}
                                    style={{width : `${percentage}%`}}
                                >
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
        <section className="panel-card activity-card">
            <div className="activity-heading">
                <h2>Latest Activity</h2>
                <button className="text-button" type="button"
                    onClick={onViewAll}
                >
                    View all
                </button>
            </div>
            <div className="activity-list">
                {activities.length===0 ?(
                    <p className="panel-subtitle">
                        No activity yet. Start by creating a task. 
                    </p>
                ):(activities.slice(0, 4).map((activity)=>(
                    <div className="activity-item" key={activity.id}>
                        <div className="activity-icon">{activity.icon}</div>
                        <div className="activity-content">
                            <strong>{activity.title}</strong>
                            <p>{activity.description}</p>
                            <span>{activity.time}</span>
                        </div>
                    </div>
                )))}
            </div>
        </section>
    </aside>
  );
}

export default RightPanel;