
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification }) {
  const { dispatch } = useNotifications();
  const queryClient = useQueryClient();

  const markReadMutation = useMutation({
    mutationFn: () =>
      apiClient.patch(`/api/notifications/${notification.id}/read`),

    onMutate: () => {
      dispatch({
        type: "MARK_READ",
        payload: notification.id,
      });
    },

    onError: () => {
      // Reload the server's notification state if the request fails.
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      apiClient
        .get("/api/notifications")
        .then((response) => {
          dispatch({
            type: "LOAD_NOTIFICATIONS",
            payload: response.data,
          });
        })
        .catch((error) =>
          console.error("Failed to refresh notifications:", error)
        );
    },
  });

  function handleClick() {
    if (!notification.isRead) {
      markReadMutation.mutate();
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        padding: "12px",
        borderBottom: "1px solid #eee",
        background: notification.isRead ? "#fff" : "#eef5ff",
        cursor: notification.isRead ? "default" : "pointer",
      }}
    >
      <div style={{ fontWeight: notification.isRead ? "normal" : "bold" }}>
        {notification.title || "Notification"}
      </div>

      <div style={{ marginTop: "4px", fontSize: "14px" }}>
        {notification.message || notification.body || ""}
      </div>

      {!notification.isRead && (
        <div style={{ marginTop: "6px", fontSize: "12px", color: "#2563eb" }}>
          Unread
        </div>
      )}
    </div>
  );
}
