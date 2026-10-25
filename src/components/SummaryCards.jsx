import { getTaskStats } from '../utils/taskUtils';

function SummaryCards({ tasks }){
    const stats =getTaskStats(tasks);

    const summaryItems = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: "▤",
      color: "blue",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: "◷",
      color: "purple",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: "✓",
      color: "green",
    },
    {
      label: "Overdue",
      value: stats.overdue,
      icon: "!",
      color: "red",
    },
  ];
    return(
        <section className="summary-grid">
            {summaryItems.map((item)=>(
                <article className="summary-card" key={item.label}>
                    <div className="summary-card-top">
                        <span>{item.label}</span>
                        <span className={`summary-icon ${item.color}`}>
                            {item.icon}
                        </span>
                    </div>
                    <div className="summary-value">{item.value}</div>
                </article>
            ))}
        </section>
    );
}

export default SummaryCards;