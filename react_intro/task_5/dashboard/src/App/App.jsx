import HbSLogo from '../assets/holberton-logo.jpg';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import './App.css';
import Notifications from '../Notifications/Notifications.jsx';

function App() {
  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);
  return (
    <>
      <div className="root-notifications">
        <Notifications/>
      </div>
      <div className='App-header'>
        <img src={HbSLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>

      <div className='App-body'>
        <p>Login to access the full dashboard</p>

        <label htmlFor="email">Email :</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password :</label>
        <input type="password" name="password" id="password" />

        <button>OK</button>
      </div>

      <div className='App-footer'>
        <p>Copyright {currentYear} - {footerText}</p>
      </div>
    </>
  )
}

export default App