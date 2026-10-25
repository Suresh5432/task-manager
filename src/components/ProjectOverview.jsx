
function ProjectOverview({ projects = [], tasks = [], getProjectProgress }) {
  return (
    <section className="project-overview">
      <div className="section-header">
        <div>
          <h2>Project Overview</h2>
          <p>Track progress across your projects</p>
        </div>

        <span className="project-count">
          {projects.length} projects
        </span>
      </div>

      {projects.length === 0 ? (
        <p className="empty-state">No projects available yet.</p>
      ) : (
        <div className="project-grid">
          {projects.map((project) => {
            const progress = getProjectProgress
              ? getProjectProgress(project.id)
              : {
                  total: tasks.filter(
                    (task) => task.projectId === project.id
                  ).length,
                  completed: 0,
                  percentage: 0,
                };

            return (
              <article className="project-card" key={project.id}>
                <div className="project-card-header">
                  <span
                    className="project-color"
                    style={{ backgroundColor: project.color }}
                  />

                  <h3>{project.name}</h3>
                </div>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-progress-info">
                  <span>Progress</span>
                  <strong>{progress.percentage}%</strong>
                </div>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-valuenow={progress.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${project.name} progress`}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress.percentage}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>

                <div className="project-card-footer">
                  <span>{progress.completed} completed</span>
                  <span>{progress.total} tasks</span>
                </div>

                {project.deadline && (
                  <p className="project-deadline">
                    Deadline: {project.deadline}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ProjectOverview;
