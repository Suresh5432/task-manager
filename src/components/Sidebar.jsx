
const menuItems = [
  { icon: "▦", label: "Dashboard" },
  { icon: "✓", label: "Tasks" },
  { icon: "▣", label: "Calendar" },
  { icon: "♧", label: "Notifications" },
  { icon: "✉", label: "Inbox" },
  { icon: "⇄", label: "Integrations" },
];

function Sidebar({
  activeView,
  onNavigate,
  unreadNotificationCount = 0,
}) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="brand">
        <div className="brand-icon">T</div>
        <span>TaskPilot</span>
      </div>

      {/* Workspace label */}
      <div className="sidebar-label">WORKSPACE</div>

      {/* Main navigation */}
      <nav className="navigation">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-item ${
              activeView === item.label ? "active" : ""
            }`}
            onClick={() => onNavigate(item.label)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-label">{item.label}</span>

            {item.label === "Notifications" &&
              unreadNotificationCount > 0 && (
                <span className="notification-badge">
                  {unreadNotificationCount > 99
                    ? "99+"
                    : unreadNotificationCount}
                </span>
              )}
          </button>
        ))}
      </nav>

      {/* Fixed bottom section */}
      <div className="sidebar-bottom">
        <button
          className={`nav-item ${
            activeView === "Help & Support" ? "active" : ""
          }`}
          type="button"
          onClick={() => onNavigate("Help & Support")}
        >
          <span className="nav-item-icon">?</span>
          <span className="nav-item-label">Help &amp; Support</span>
        </button>

        <button
          className={`nav-item ${
            activeView === "Settings" ? "active" : ""
          }`}
          type="button"
          onClick={() => onNavigate("Settings")}
        >
          <span className="nav-item-icon">⚙</span>
          <span className="nav-item-label">Settings</span>
        </button>

        <div className="profile">
          <div className="avatar">SK</div>

          <div className="profile-info">
            <strong>Suresh</strong>
            <span>Personal workspace</span>
          </div>

          <button
            className="profile-menu"
            type="button"
            aria-label="Profile menu"
            onClick={() => onNavigate("Settings")}
          >
            ⋯
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
