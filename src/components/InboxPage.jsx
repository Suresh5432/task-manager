
import { useState, useEffect } from "react";
const initialMessages=[
    {
      id: 1,
      sender: "TaskPilot",
      subject: "Welcome to TaskPilot",
      preview: "Your workspace is ready to use.",
      body: "Welcome! You can organize tasks, track progress, and manage due dates from your TaskPilot workspace.",
      time: "Today",
      read: false,
    },
    {
      id: 2,
      sender: "TaskPilot Updates",
      subject: "Stay on top of your tasks",
      preview: "A few tips to organize your workspace.",
      body: "Use priorities, due dates, and status filters to keep your work organized.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 3,
      sender: "TaskPilot",
      subject: "Your productivity overview",
      preview: "Review your completed and pending tasks.",
      body: "Visit your dashboard to review completed, in-progress, and overdue tasks.",
      time: "Oct 23",
      read: true,
    },
  ];

function InboxPage() {

  const [messages, setMessages] = useState(loadMessages);

  const [selectedId, setSelectedId] = useState(null);

  const selectedMessage = messages.find(
    (message) => message.id === selectedId
  );

  function loadMessages(){
    try{
        const saved =localStorage.getItem("taskpilot-inbox");
        return saved ? JSON.parse(saved) : initialMessages;
    }
    catch{
        return initialMessages;
    }
  }

  useEffect(()=>{
    localStorage.setItem("taskpilot-inbox", JSON.stringify(messages));
  },[messages])

  function openMessage(message) {
    setSelectedId(message.id);

    setMessages((current) =>
      current.map((item) =>
        item.id === message.id
          ? { ...item, read: true }
          : item
      )
    );
  }

  function toggleRead(messageId) {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? { ...message, read: !message.read }
          : message
      )
    );
  }

  const unreadCount = messages.filter(
    (message) => !message.read
  ).length;


  return (
    <section className="inbox-page">
      <div className="inbox-heading">
        <div>
          <h2>Inbox</h2>
          <p>
            {unreadCount} unread message
            {unreadCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="inbox-layout">
        <div className="message-list">
          {messages.map((message) => (
            <button
              type="button"
              key={message.id}
              className={`message-item ${
                selectedId === message.id ? "selected" : ""
              } ${!message.read ? "unread" : ""}`}
              onClick={() => openMessage(message)}
            >
              <span className="message-avatar">
                {message.sender.charAt(0)}
              </span>

              <span className="message-summary">
                <span className="message-sender">
                  {message.sender}
                </span>
                <span className="message-subject">
                  {message.subject}
                </span>
                <span className="message-preview">
                  {message.preview}
                </span>
              </span>

              <span className="message-meta">
                <span>{message.time}</span>
                {!message.read && (
                  <span className="unread-dot" />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="message-reader">
          {selectedMessage ? (
            <>
              <div className="reader-header">
                <div>
                  <h3>{selectedMessage.subject}</h3>
                  <p>
                    From {selectedMessage.sender}
                    {" · "}
                    {selectedMessage.time}
                  </p>
                </div>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => toggleRead(selectedMessage.id)}
                >
                  {selectedMessage.read ? "Mark as unread":"Mark ad read" }
                </button>
              </div>

              <p className="message-body">
                {selectedMessage.body}
              </p>
            </>
          ) : (
            <div className="reader-empty">
              <span>✉</span>
              <h3>Select a message</h3>
              <p>Choose a message to read it here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InboxPage;
