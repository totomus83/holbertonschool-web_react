import React from 'react';
import Notifications from './Notifications';
import { getCurrentYear, getFooterCopy } from './utils';
import HbSLogo from './assets/holberton-logo.jpg';
import './App.css';

function App() {
  return (
    <>
      <div className="holberton-header">
        <img src={HbSLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>

      <div className="holberton-body">
        <p>Login to access the full dashboard</p>

        {/* LOGIN FORM */}
        <form>
          {/* EMAIL */}
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          {/* PASSWORD */}
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          {/* BUTTON */}
          <button type="button">OK</button>
        </form>
      </div>

      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="holberton-footer">
        <p>
          Copyright {getCurrentYear()} - {getFooterCopy(true)}
        </p>
      </div>
    </>
  );
}

export default App;