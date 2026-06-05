import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type = 'default', value, html, markAsRead, id } = this.props;

    const style = {
      color: type === 'default' ? 'blue' : 'red',
    };

    return (
      <li
        data-notification-type={type}
        style={style}
        onClick={() => markAsRead && markAsRead(id)}
        dangerouslySetInnerHTML={html ? { __html: html } : undefined}
      >
        {!html ? value : null}
      </li>
    );
  }
}

export default NotificationItem;