import CloseButton from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({ notifications = [] }) {
  const handleClick = () => console.log('Close button has been clicked');
  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <button aria-label='Close' style={{
        width: '1.75rem',
        height: '1rem',
        marginTop: '0.25rem',
        marginLeft: 'auto',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
      onClick={handleClick}>
        <img src={CloseButton} />
      </button>
      <ul>
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            type={notif.type}
            value={notif.value}
            html={notif.html}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;