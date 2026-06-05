import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type = 'default', value, html, markAsRead, id } = this.props;

    const style = {
      color: type === 'default' ? 'blue' : 'red',
    };

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={style}
          dangerouslySetInnerHTML={{ __html: html }}
          onClick={() => markAsRead && markAsRead(id)}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        style={style}
        onClick={() => markAsRead && markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;