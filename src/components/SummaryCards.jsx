

const summaryItems=[
{
    label: "total Tasks",
    value: 24,
    icon:"▤",
    color: "blue",
    trend: "+12%",
    description: "vs. last month"
},{
    label: "Inprogress",
    value: 8,
    icon:"◷",
    color: "purple",
    trend: "+5%",
    description: "vs. last month"
},{
    label: "Completed",
    value: 12,
    icon:"✓",
    color: "green",
    trend: "+18%",
    description: "vs. last month"
},{
    label: "Overdue",
    value: 4,
    icon:"!",
    color: "red",
    trend: "-3%",
    description: "vs. last month"
}];

function SummaryCards(){
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
                    <div className="summary-card">
                        <span className={item.color}>{item.trend}</span>
                        <span>{item.description}</span>
                    </div>
                </article>
            ))}
        </section>
    );
}

export default SummaryCards;