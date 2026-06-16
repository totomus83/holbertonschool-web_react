import { Component } from 'react';
import HbSLogo from '../assets/holberton-logo.jpg';
import Notifications from '../Notifications/Notifications';
import newContext from '../Context/context';

class Header extends Component {
  static contextType = newContext;

  render() {
    const { notifications, displayDrawer } = this.props;
    const { user, logOut } = this.context;

    return (
      <div className="flex items-center justify-between border-b-2 border-(--main-color) p-2 max-[520px]:flex-col max-[520px]:items-start">

        <div className="flex items-center max-[520px]:flex-col max-[520px]:items-start">
          <img src={HbSLogo} alt="holberton logo" className="w-[200px]" />

          <h1 className="ml-4 text-(--main-color) font-[Arial,Helvetica,sans-serif] max-[520px]:ml-0 max-[520px]:text-sm">
            School dashboard
          </h1>
        </div>

        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
        />

        {user.isLoggedIn && (
          <p id="logoutSection">
            Welcome {user.email} (<a href="#" onClick={logOut}>logout</a>)
          </p>
        )}
      </div>
    );
  }
}

export default Header;