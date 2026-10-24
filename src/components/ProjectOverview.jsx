const projects = [
  {
    id: 1,
    name: "Website Redesign",
    category: "UI/UX Design",
    dueDate: "Nov 15, 2026",
    totalTasks: 12,
    completedTasks: 9,
    color: "blue",
    members: ["AS", "MK", "RJ"],
  },
  {
    id: 2,
    name: "Mobile Application",
    category: "Development",
    dueDate: "Nov 22, 2026",
    totalTasks: 20,
    completedTasks: 11,
    color: "purple",
    members: ["SK", "AP", "VK"],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    category: "Marketing",
    dueDate: "Nov 30, 2026",
    totalTasks: 15,
    completedTasks: 6,
    color: "orange",
    members: ["RJ", "AS", "MK"],
  },
];

function ProjectOverview(){
    return (
        <section className="project-section">
            <div className="section-heading">
                <div>
                    <h2>Project OverView</h2>
                    <p>Track progress across yout porjects</p>
                </div>
                <button type="button" className="text-button">
                    View all
                </button>
            </div>
            <div className="projects-grid">
                {projects.map((project)=>{
                    const progress= 
                        project.totalTasks ? 
                                Math.round((project.completedTasks/project.totalTasks)*100)
                                : 0;
                    return (
                        <article className="project-card" key={project.id}>
                            <div className="project-card-header">
                                <div className={`project-icon ${project.color}`}>
                                    ▰
                                </div>
                                <button
                                    type="button"
                                    className="project-menu"
                                    aria-label={`More options for ${project.name}`}
                                >
                                    ⋯
                                </button>
                            </div>
                            <h3>{project.name}</h3>
                            <p className="project-category">
                                {project.category}
                            </p>
                            <div className="project-date">
                                <span>Due date</span>
                                <strong>{project.dueDate}</strong>
                            </div>
                            <div className="project-progress-label">
                                <span>Progress</span>
                                <strong>{progress}%</strong>
                            </div>
                            <div 
                                className="progress-track"
                                role="progressbar"
                                aria-label={`${project.name} progress`}
                                aria-valuenow={progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div
                                    className={`progress-fill ${project.color}`}
                                    style={{width: `${progress}%`}}
                                />
                            </div>

                            <div className="project-footer">
                                <div className="member-avatars">
                                    {project.members.map((member,index)=>{
                                        <span
                                        className={`member-avatar avatar-${index}`}
                                        key={`${project.id}-${member}-${index}`}
                                        >
                                            {member}
                                        </span>
                                    })}
                                </div>
                                <span className="task-count">
                                    {project.completedTasks}/{project.totalTasks} tasks
                                </span>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default ProjectOverview;