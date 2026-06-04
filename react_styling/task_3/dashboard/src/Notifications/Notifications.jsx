import { Component } from 'react';
import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  handleClick = () => console.log('Close button has been clicked');

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications = [], displayDrawer = true } = this.props;

    return (
      <div className="w-1/4 border-2 border-dashed border-(--main-color) p-1.5">
        <div className="notification-title flex justify-end">
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="notification-items p-1.5">
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
              {notifications.length === 0 ? (
                <li>No new notification for now</li>
              ) : (
                notifications.map((notif) => (
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