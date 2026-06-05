import HbSLogo from '../assets/holberton-logo.jpg';
import Notifications from '../Notifications/Notifications';

function Header({ notifications, displayDrawer }) {
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
    </div>
  );
}

export default Header;