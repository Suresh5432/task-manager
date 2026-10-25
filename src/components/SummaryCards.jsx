import { getTaskStats } from '../utils/taskUtils';

function SummaryCards({ tasks }){

    const totalTasks=tasks.length;
    const completedTasks=tasks.filter((task)=>
      task.status==="Completed").length;

    const inProgressTasks=tasks.filter((task)=>
      task.status==="In Progress").length;

    const overdueTasks=tasks.filter((task =[])=>{
      if(!task.dueDate || task.status=="Completed"){
        return false;
      }
      const dueDate=new Date(task.dueDate);
      dueDate.setHours(23,59,59,999);
      return !Number.isNaN(dueDate.getTime()) && dueDate< new Date();
    }).length;

    const completionPercentage=totalTasks===0 ? 0 : Math.round((completedTasks/totalTasks)*100);


    const summaryItems = [

    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "▤",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      icon: "◷",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "✓",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: "!",
    },
  ];
    return(
        <section className="summary-grid">
            {summaryItems.map((item)=>(
                <article className="summary-card" key={item.label}>
                    <div className="summary-card-top">
                        <span>{item.label}</span>
                        <span className="summary-card-icon">
                            {item.icon}
                        </span>
                    </div>
                    <div className="summary-value">{item.value}</div>
                </article>
            ))}
            <div className="completion-progress">
              <div className="completion-progress-header">
                <span>Overall completion</span>
                <strong>{completionPercentage}%</strong>
              </div>
                
              <div
                className="completion-progress-track"
                role="progressbar"
                aria-label="Task completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={completionPercentage}
              >
                <div
                  className="completion-progress-fill"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
                
              <p>
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
        </section>
    );
}

export default SummaryCards;