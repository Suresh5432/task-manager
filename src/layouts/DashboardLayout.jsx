import ProjectOverview from "../components/ProjectOverview";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";

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
                    <SummaryCards/>
                    <ProjectOverview/>
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