import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({ listNotifications = [], displayDrawer = false }) {
  const handleClick = () => console.log('Close button has been clicked');
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
            onClick={handleClick}
          >
            <img src={CloseButton} alt="close" />
          </button>
          <ul>
            {listNotifications.length === 0 ? (
              <li>No new notification for now</li>
            ) : (
              listNotifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  type={notif.type}
                  value={notif.value}
                  html={notif.html}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({ listNotifications = [], displayDrawer = false }) {
  const handleClick = () => console.log('Close button has been clicked');
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
            onClick={handleClick}
          >
            <img src={CloseButton} alt="close" />
          </button>
          <ul>
            {listNotifications.length === 0 ? (
              <li>No new notification for now</li>
            ) : (
              listNotifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  type={notif.type}
                  value={notif.value}
                  html={notif.html}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;