function NotificationItem({ type, value, html }) {
  return(
    html ?
      <li data-notification-type={type}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ color: type === 'default' ? "blue" : "red" }}/>:
      <li data-notification-type={type} style={{ color: type === 'default' ? "blue" : "red" }}>{ value }</li>
  );
}

export default NotificationItem;