import { useState, useCallback, useEffect, Fragment } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import newContext from '../Context/context';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/notifications.json');
        const data = res.data.map((notif) => {
          if (notif.id === 3) return { ...notif, html: getLatestNotification() };
          return notif;
        });
        setNotifications(data);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/courses.json');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to load courses', err);
      }
    };
    fetchCourses();
  }, [user]);

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
                <CourseList courses={courses} />
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