
function NotificationsPage({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onOpenTask,
}) {
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <section className="notifications-page">
      <div className="notifications-header">
        <div>
          <h2>Notifications</h2>
          <p>
            You have {unreadCount} unread notification
            {unreadCount === 1 ? "" : "s"}.
          </p>
        </div>

        <button
          type="button"
          className="text-button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="notifications-empty">
          <span className="notification-empty-icon">✓</span>
          <h3>You're all caught up!</h3>
          <p>Task updates will appear here.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <article
              className={`notification-item ${
                notification.read ? "is-read" : "is-unread"
              }`}
              key={notification.id}
            >
              <div className="notification-icon">
                {notification.icon}
              </div>

              <div className="notification-body">
                <strong>{notification.title}</strong>
                <p>{notification.description}</p>
                <span>{notification.time}</span>
              </div>

              <div className="notification-actions">
                {notification.taskId != null && (
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => onOpenTask(notification.taskId)}
                  >
                    View task
                  </button>
                )}

                {!notification.read && (
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => onMarkRead(notification.id)}
                  >
                    Mark read
                  </button>
                )}

                {!notification.read && (
                  <span
                    className="unread-dot"
                    aria-label="Unread"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default NotificationsPage;
