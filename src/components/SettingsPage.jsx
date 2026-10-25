
import { useEffect, useState } from "react";

const defaultSettings = {
  fullName: "Suresh",
  email: "",
  workspace: "Personal workspace",
  theme: "light",
  compactMode: false,
  defaultPriority: "Medium",
  defaultStatus: "To Do",
};

function loadSettings() {
  try {
    const saved = localStorage.getItem("taskpilot-settings");
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function SettingsPage({onSettingsChange}) {
  const [settings, setSettings] = useState(loadSettings);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "taskpilot-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  function updateSetting(key, value) {
    setSettings((current) => {
      const updated={
      ...current,
      [key]: value,
      };
       localStorage.setItem(
        "taskpilot-settings",
        JSON.stringify(updated)
      );
      onSettingsChange?.(updated);
      return updated
    });
    setSavedMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "taskpilot-settings",
      JSON.stringify(settings)
    );
    onSettingsChange?.(settings);
    setSavedMessage("Settings saved successfully.");
  }

  function resetSettings() {
    setSettings(defaultSettings);
    localStorage.setItem(
      "taskpilot-settings",
      JSON.stringify(defaultSettings)
    );
    onSettingsChange?.(defaultSettings);
    setSavedMessage("Settings restored to defaults.");
  }

  return (
    <section className="settings-page">
      <div className="settings-heading">
        <h2>General Settings</h2>
        <p>Customize your profile and workspace preferences.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="settings-card">
          <div className="settings-section-heading">
            <h3>Profile</h3>
            <p>Manage your personal information.</p>
          </div>

          <div className="settings-fields">
            <label>
              Full name
              <input
                value={settings.fullName}
                onChange={(event) =>
                  updateSetting("fullName", event.target.value)
                }
                maxLength={100}
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={settings.email}
                onChange={(event) =>
                  updateSetting("email", event.target.value)
                }
                placeholder="you@example.com"
              />
            </label>

            <label>
              Workspace name
              <input
                value={settings.workspace}
                onChange={(event) =>
                  updateSetting("workspace", event.target.value)
                }
                maxLength={100}
                required
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-section-heading">
            <h3>Appearance</h3>
            <p>Choose how TaskPilot looks on this device.</p>
          </div>

          <div className="settings-fields">
            <label>
              Theme
              <select
                value={settings.theme}
                onChange={(event) =>
                  updateSetting("theme", event.target.value)
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>

          <label className="settings-toggle">
            <span>
              <strong>Compact mode</strong>
              <small>Reduce spacing in task lists.</small>
            </span>

            <input
              type="checkbox"
              checked={settings.compactMode}
              onChange={(event) =>
                updateSetting("compactMode", event.target.checked)
              }
            />
          </label>
        </section>

        <section className="settings-card">
          <div className="settings-section-heading">
            <h3>Task defaults</h3>
            <p>Choose the initial values for new tasks.</p>
          </div>

          <div className="settings-fields">
            <label>
              Default priority
              <select
                value={settings.defaultPriority}
                onChange={(event) =>
                  updateSetting("defaultPriority", event.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label>
              Default status
              <select
                value={settings.defaultStatus}
                onChange={(event) =>
                  updateSetting("defaultStatus", event.target.value)
                }
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </label>
          </div>
        </section>

        <div className="settings-actions">
          <button
            type="button"
            className="settings-reset-button"
            onClick={resetSettings}
          >
            Reset defaults
          </button>

          <button type="submit" className="add-task-button">
            Save settings
          </button>
        </div>

        {savedMessage && (
          <p className="settings-success" role="status">
            {savedMessage}
          </p>
        )}
      </form>
    </section>
  );
}

export default SettingsPage;
