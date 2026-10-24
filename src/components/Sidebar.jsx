const menuItems = [
  { icon: "▦", label: "Dashboard" },
  { icon: "✓", label: "Tasks" },
  { icon: "▣", label: "Calendar" },
  { icon: "♧", label: "Notifications" },
  { icon: "✉", label: "Inbox" },
  { icon: "⇄", label: "Integrations" },
];
function Sidebar(){
 return (
    <aside className="sidebar">
        <div className="brand">
            <div className="brand-icon">T</div>
            <span>TaskPilot</span>
        </div>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="navigation">
            {menuItems.map((item)=>(
                <button
                    key={item.label}
                    type="button"
                    className={`nav-item ${item.label==="Dashboard" ? "active" :""}`}
                >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                </button>
            ))}
        </nav>
        <div className="sidebar-bottom">

            <button className="nav-item" type="button">
                <span className="nav-icon">?</span>
                <span>Help & support</span>
            </button>

            <button className="nav-item" type="button">
                <span className="nav-icon">⚙</span>
                <span>Settings</span>
            </button>
            <div className="profile">
                <div className="avatar">SK</div>
                <div className="profile-info">
                    <strong>Suresh</strong>
                    <span>Personal workspace</span>
                </div>
                <span className="profile-memu">...</span>
            </div>
        </div>
    </aside>
 )
}
export default Sidebar;