import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type = 'default', value, html, markAsRead, id } = this.props;
    const colorClass = type === 'default'
      ? 'text-(--default-notification-item)'
      : 'text-(--urgent-notification-item)';

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={colorClass}
          dangerouslySetInnerHTML={{ __html: html }}
          onClick={() => markAsRead && markAsRead(id)}
        />
      );
    }
    return (
      <li
        data-notification-type={type}
        className={colorClass}
        onClick={() => markAsRead && markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;