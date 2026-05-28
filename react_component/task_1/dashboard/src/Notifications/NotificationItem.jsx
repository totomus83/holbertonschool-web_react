function NotificationItem({ type = 'default', value, html }) {
  const style = { color: type === 'default' ? 'blue' : 'red' };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <li data-notification-type={type} style={style}>
      {value}
    </li>
  );
}

export default NotificationItem;