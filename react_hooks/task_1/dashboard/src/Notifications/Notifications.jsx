import { PureComponent } from 'react';
import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends PureComponent {
  handleClick = () => console.log('Close button has been clicked');

  render() {
    const {
      notifications = [],
      displayDrawer = false,
      handleDisplayDrawer = () => {},
      handleHideDrawer = () => {},
      markNotificationAsRead = () => {},
    } = this.props;

    const isEmpty = notifications.length === 0;

    return (
      <div>
        <p
          className="notification-title flex justify-end cursor-pointer"
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </p>

        <div
          className="
            w-[400px] ml-auto border-2 border-dashed border-[var(--main-color)] p-2
            max-[912px]:w-full max-[912px]:fixed max-[912px]:inset-0
            max-[912px]:z-50 max-[912px]:bg-white max-[912px]:p-3
          "
        >
          {displayDrawer && (
            <div className="notification-items relative p-3 max-[912px]:h-full max-[912px]:overflow-y-auto">

              {isEmpty ? (
                <p>
                  No new notification for now
                </p>
              ) : (
                <>
                  <button
                    aria-label="Close"
                    className="absolute top-2 right-2 w-6 h-6 cursor-pointer hover:opacity-70"
                    onClick={() => {
                      this.handleClick();
                      handleHideDrawer();
                    }}
                  >
                    <img src={CloseButton} alt="close" className="w-full h-full" />
                  </button>

                  <p className="mb-2">Here is the list of notifications</p>

                  <ul className="space-y-2 max-[912px]:space-y-3">
                    {notifications.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        id={notif.id}
                        type={notif.type}
                        value={notif.value}
                        html={notif.html}
                        markAsRead={markNotificationAsRead}
                      />
                    ))}
                  </ul>
                </>
              )}

            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;