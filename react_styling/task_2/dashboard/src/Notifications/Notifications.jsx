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

    const shouldBounce =
      notifications.length > 0 && displayDrawer === false;

    return (
      <div>
        <p
          className={`notification-title flex justify-end ${
            shouldBounce ? 'animate-bounce' : ''
          }`}
        >
          Your notifications
        </p>

        {displayDrawer && (
          <div className="w-[400px] ml-auto border-2 border-dashed border-[var(--main-color)] p-2">
            <div className="notification-items relative p-3">

              <p>Here is the list of notifications</p>

              {/* ALWAYS render UL (critical for tests) */}
              <ul>
                {notifications.length > 0 ? (
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
                ) : (
                  <li>No new notification for now</li>
                )}
              </ul>

              {notifications.length > 0 && (
                <button
                  aria-label="Close"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={this.handleClick}
                >
                  <img src={CloseButton} alt="close" />
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    );
  }
}

Notifications.defaultProps = {
  notifications: [],
  displayDrawer: true,
};

export default Notifications;