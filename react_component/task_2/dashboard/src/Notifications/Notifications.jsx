import { Component } from 'react';
import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

class Notifications extends Component {
  handleClick = () => console.log('Close button has been clicked');

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { listNotifications = [], notifications = [], displayDrawer = true } = this.props;
    const items = listNotifications.length > 0 ? listNotifications : notifications;

    return (
      <div>
        <div className="notification-title">
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="notification-items">
            <p>Here is the list of notifications</p>
            <button
              aria-label="Close"
              style={{
                width: '1.75rem',
                height: '1rem',
                marginTop: '0.25rem',
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={this.handleClick}
            >
              <img src={CloseButton} alt="close" />
            </button>
            <ul>
              {items.length === 0 ? (
                <li>No new notification for now</li>
              ) : (
                items.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                    markAsRead={this.markAsRead}
                  />
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;