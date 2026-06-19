import { useState, useCallback, useEffect, Fragment } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import newContext from '../Context/context';

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/holbertonschool-web_react/notifications.json')
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error('Failed to load notifications', err));
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ email: '', password: '', isLoggedIn: false });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <newContext.Provider value={{ user, logOut }}>
      <Fragment>
        <Header />

        <div className="flex min-h-screen max-[912px]:flex-col">
          <div className="flex-1 max-[912px]:w-full">
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login
                  logIn={logIn}
                  email={user.email}
                  password={user.password}
                />
              </BodySectionWithMarginBottom>
            )}

            <BodySection title="News from the School">
              <p>
                Holberton School News goes here ipsum Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Similique, asperiores architecto
                blanditiis fuga doloribus sit illum aliquid ea distinctio minus
                accusantium, impedit quo voluptatibus ut magni dicta. Recusandae,
                quia dicta?
              </p>
            </BodySection>
          </div>

          <Notifications
            notifications={notifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
          />
        </div>

        <Footer />
      </Fragment>
    </newContext.Provider>
  );
}

export default App;