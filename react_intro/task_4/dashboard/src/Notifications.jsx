import CloseButton from './assets/close-button.png';
import { getLatestNotification } from './utils';
import './Notifications.css';

function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  )
}

export default Notifications;