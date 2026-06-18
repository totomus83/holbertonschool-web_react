import { memo } from 'react';

function NotificationItem({ type = 'default', value, html, markAsRead, id }) {
  const colorClass =
    type === 'default'
      ? 'text-(--default-notification-item)'
      : 'text-(--urgent-notification-item)';

  const baseClass = `${colorClass} text-sm max-[520px]:text-xs border-b border-gray-200 py-1 px-2 max-[912px]:py-2 max-[912px]:px-3`;

  if (html) {
    return (
      <li
        data-notification-type={type}
        className={baseClass}
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={() => markAsRead && markAsRead(id)}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={baseClass}
      onClick={() => markAsRead && markAsRead(id)}
    >
      {value}
    </li>
  );
}

export default memo(NotificationItem);