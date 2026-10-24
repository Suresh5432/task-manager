import Sidebar from "../components/Sidebar";

function DashboardLayout(){
    return(
        <div className="app-background">
            <div className="dashboard-window">
                <Sidebar />
                <main className="main-content">
                    <header className="dashboard-header">
                        <div>
                            <h1>Dashboard</h1>
                            <p>Welcome back! Here's your workspace overview.</p>
                        </div>
                        <button className="add-task-button" type="button">
                            + Add Task
                        </button>
                    </header>
                    <section className="dashboard-placeholder">
                        <h2>Your workspace</h2>
                        <p>
                            Your summary cards, projects, and task table will appear here
                        </p>
                    </section>
                </main>
                <aside className="right-panel">
                    <section className="panel-placeholder">
                        <h2>Task Progress</h2>
                        <p>Your progress chart will apper here.</p>
                    </section>
                    <section className="panel-placeholder">
                        <h2>Latest Activity</h2>
                        <p>Your recent activiters will appear here.</p>
                    </section>
                </aside>
            </div>
        </div>
    )
}

export default DashboardLayout;