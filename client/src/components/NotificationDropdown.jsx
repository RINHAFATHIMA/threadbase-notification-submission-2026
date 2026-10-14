
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const { notifications, unreadCount } = state;

  function markAllAsRead() {
    dispatch({ type: "MARK_ALL_READ" });
  }

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        width: "340px",
        maxWidth: "90vw",
        background: "#fff",
        color: "#222",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      >
        <strong>Notifications</strong>

        {unreadCount > 0 && (
          <button type="button" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notifications"
        >
          ×
        </button>
      </div>

      <div style={{ maxHeight: "360px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <p style={{ padding: "16px", textAlign: "center" }}>
            No notifications yet.
          </p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
}
