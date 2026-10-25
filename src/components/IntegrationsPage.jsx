
import { useEffect, useState } from "react";

const initialIntegrations = [
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    icon: "⌘",
    description: "Connect repositories and track development work.",
    connected: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "Productivity",
    icon: "▦",
    description: "Keep task deadlines aligned with your calendar.",
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    icon: "#",
    description: "Keep your team informed about task updates.",
    connected: false,
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    icon: "N",
    description: "Organize project notes alongside your tasks.",
    connected: false,
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "Storage",
    icon: "△",
    description: "Keep project documents accessible to your team.",
    connected: false,
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    icon: "◉",
    description: "Share workspace updates with your community.",
    connected: false,
  },
];

function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(() => {
    try {
      const saved = localStorage.getItem("taskpilot-integrations");
      return saved ? JSON.parse(saved) : initialIntegrations;
    } catch {
      return initialIntegrations;
    }
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "taskpilot-integrations",
      JSON.stringify(integrations)
    );
  }, [integrations]);

  function toggleConnection(integrationId) {
    setIntegrations((current) =>
      current.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              connected: !integration.connected,
            }
          : integration
      )
    );
  }

  const connectedCount = integrations.filter(
    (integration) => integration.connected
  ).length;

  const visibleIntegrations = integrations.filter((integration) => {
    if (filter === "Connected") return integration.connected;
    if (filter === "Not connected") return !integration.connected;
    return true;
  });

  return (
    <section className="integrations-page">
      <div className="integrations-summary">
        <div>
          <h2>Your integrations</h2>
          <p>
            Connect the tools you use to manage your work.
          </p>
        </div>

        <div className="integration-count">
          <strong>{connectedCount}</strong>
          <span>of {integrations.length} connected</span>
        </div>
      </div>

      <div className="integration-toolbar">
        <span>Available integrations</span>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter integrations"
        >
          <option>All</option>
          <option>Connected</option>
          <option>Not connected</option>
        </select>
      </div>

      <div className="integrations-grid">
        {visibleIntegrations.map((integration) => (
          <article className="integration-card" key={integration.id}>
            <div className="integration-card-top">
              <div className={`integration-icon ${integration.id}`}>
                {integration.icon}
              </div>

              <span
                className={`integration-status ${
                  integration.connected ? "connected" : ""
                }`}
              >
                <span className="integration-status-dot" />
                {integration.connected ? "Connected" : "Not connected"}
              </span>
            </div>

            <div className="integration-info">
              <h3>{integration.name}</h3>
              <span className="integration-category">
                {integration.category}
              </span>
              <p>{integration.description}</p>
            </div>

            <button
              type="button"
              className={
                integration.connected
                  ? "integration-disconnect"
                  : "integration-connect"
              }
              onClick={() => toggleConnection(integration.id)}
            >
              {integration.connected ? "Disconnect" : "Connect"}
            </button>
          </article>
        ))}
      </div>

      {visibleIntegrations.length === 0 && (
        <div className="integration-empty">
          No integrations match this filter.
        </div>
      )}

      <p className="integration-demo-note">
        Demo mode: connection status is saved in this browser.
        No external accounts are connected.
      </p>
    </section>
  );
}

export default IntegrationsPage;
