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
      <div>
        <p className="notification-title flex justify-end">
          Your notifications
        </p>

        <div className="w-[400px] ml-auto border-2 border-dashed border-[var(--main-color)] p-2">
          {displayDrawer && (
            <div className="notification-items relative p-3">
              
              {/* CLOSE BUTTON */}
              <button
                aria-label="Close"
                className="absolute top-2 right-2 w-6 h-6 cursor-pointer hover:opacity-70"
                onClick={this.handleClick}
              >
                <img src={CloseButton} alt="close" className="w-full h-full" />
              </button>

              {/* CONTENT */}
              <p className="mb-2">Here is the list of notifications</p>

              <ul className="space-y-2">
                {notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>

              {notifications.length === 0 && (
                <p className="text-gray-500 mt-2">
                  No new notification for now
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;