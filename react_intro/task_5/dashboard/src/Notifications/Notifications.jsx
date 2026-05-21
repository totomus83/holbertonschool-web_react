import React from 'react';
import { getLatestNotification } from '../utils/utils';
import closeIcon from '../assets/close-icon.png';
import './Notifications.css';

function Notifications() {
  const handleClose = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="notification-items">

      {/* CLOSE BUTTON */}
      <button
        aria-label="Close"
        className="close-button"
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer'
        }}
        onClick={handleClose}
      >
        <img src={closeIcon} alt="close icon" />
      </button>

      <p>Here is the list of notifications</p>

      <ul>
        <li data-priority="default">
          New course available
        </li>

        <li data-priority="urgent">
          New resume available
        </li>

        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{
            __html: getLatestNotification()
          }}
        />
      </ul>
    </div>
  );
}

export default Notifications;