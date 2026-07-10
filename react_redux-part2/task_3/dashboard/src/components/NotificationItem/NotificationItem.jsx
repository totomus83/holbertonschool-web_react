import { memo } from "react";

const NotificationItem = memo(function NotificationItem({ type, value, id, markAsRead }) {
  const color = type === "urgent" ? "red" : "blue";

  return (
    <li
      data-notification-type={type}
      style={{ color }}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;