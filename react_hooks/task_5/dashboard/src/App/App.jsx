import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import LoginForm from '../Login/Login.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import Footer from '../Footer/Footer.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'
import newContext from '../Context/context.js';
import { getLatestNotification } from '../utils/utils';

function App() {
  // Déclaration des différents states
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ email: '', password: '', isLoggedIn: false });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);
  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await axios.get(`${baseUrl}notifications.json`);

        const data = Array.isArray(response.data) ? response.data : response;
        const transformedResponse = data.map((element, index, array) => {
          if (index === array.length - 1) {
            return { ...element, html: getLatestNotification() };
          } else {
            return element;
          }
        })
        setNotifications(transformedResponse);
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchNotificationsData();
  }, []);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await axios.get(`${baseUrl}courses.json`);

        const data = Array.isArray(response.data) ? response.data : response;
        setCourses(data);
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchCoursesData();
  }, [user]);


  // Fonction logIn
  const logIn = useCallback((email, password) => {
    const user = { email, password, isLoggedIn: true };
    setUser(user);
  }, []);

  // Fonction logOut
  const logOut = useCallback(() => {
    const user = { email: '', password: '', isLoggedIn: false };
    setUser(user);
  }, []);

  // Fonction markNotificationAsRead
  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications(notifications.filter(item => item.id !== id));
  }, [notifications]);

  // Déclaration de contextValue
  const contextValue = { user: user, logOut: logOut };

  return (
    <newContext.Provider value={ contextValue } >
      <div className='flex flex-col min-h-screen'>
        <div className="header flex md:justify-between flex-col-reverse md:flex-row md:items-center">
          <div className="header-wrapper grow">
            <Header />
          </div>
          <div className="root-notifications">
            <Notifications notifications={notifications}
              markNotificationAsRead={markNotificationAsRead}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={handleDisplayDrawer}
              handleHideDrawer={handleHideDrawer} />
          </div>
        </div>
        {user.isLoggedIn ?
          <BodySectionWithMarginBottom title={'Course list'}>
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>:
          <BodySectionWithMarginBottom title={'Log in to continue'}>
            <LoginForm logIn={logIn} email={user.email} password={user.password} />
          </BodySectionWithMarginBottom>
        }
        <BodySection title={'News from the School'}>
          <p className='pl-4'>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio
            minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
        </BodySection>
        <Footer />
      </div>
    </newContext.Provider>
  )
}

export default App;
