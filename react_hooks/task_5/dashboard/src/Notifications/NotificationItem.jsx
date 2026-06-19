import { memo } from "react";

function NotificationItem({ type, value, html, markAsRead, id }) {
  return(
    html ?
      <li className={ type === 'default' ?
        "text-[var(--default-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" :
        "text-[var(--urgent-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" }
        data-notification-type={type}
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={() => markAsRead(id)} />:
      <li className={ type === 'default' ?
        "text-[var(--default-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" :
        "text-[var(--urgent-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" }
        data-notification-type={type}
        onClick={() => markAsRead(id)}>{ value }</li>
  );
}

export default memo(NotificationItem);
