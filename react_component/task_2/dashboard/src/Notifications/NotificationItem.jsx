import { Component } from 'react';

class NotificationItem extends Component {
  render() {
    const { type, value, html, markAsRead, id } = this.props;
    const style = { color: type === 'default' ? 'blue' : 'red' };

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={style}
          dangerouslySetInnerHTML={{ __html: html }}
          onClick={() => markAsRead(id)}
        />
      );
    }
    return (
      <li
        data-notification-type={type}
        style={style}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
};

export default NotificationItem;